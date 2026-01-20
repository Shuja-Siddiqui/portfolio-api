const { DeveloperModel, ProjectModel, PromptModel, SkillsModel } = require("../model");
const Response = require("./Response");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const https = require("https");
const { Settings } = require("./Settings");

class Extension extends Response {
  // Get all developers for extension
  getDevelopers = async (req, res) => {
    try {
      const developers = await DeveloperModel.find({})
        .populate({
          path: "skills",
          populate: {
            path: "title",
          },
        })
        .populate({
          path: "experience",
        })
        .select("name devId about skills experience")
        .select("-__v");

      return this.sendResponse(req, res, {
        data: developers,
        status: 200,
        message: "Developers fetched successfully",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };

  // Get single developer with full details
  getDeveloper = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Developer ID is required",
          status: 400,
        });
      }

      const developer = await DeveloperModel.findOne({
        $or: [{ _id: id }, { devId: id }],
      })
        .populate({
          path: "skills",
          populate: {
            path: "title",
          },
        })
        .populate({
          path: "experience",
        })
        .select("name devId about skills experience")
        .select("-__v");

      if (!developer) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Developer not found",
          status: 404,
        });
      }

      return this.sendResponse(req, res, {
        data: developer,
        status: 200,
        message: "Developer fetched successfully",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };

  // Search projects by technology/skill name or project name
  searchProjects = async (req, res) => {
    try {
      const { search } = req.query;

      if (!search) {
        // Return all projects if no search query
        const projects = await ProjectModel.find({})
          .populate({
            path: "technologies",
            populate: {
              path: "name",
            },
          })
          .select("-__v")
          .limit(50);

        return this.sendResponse(req, res, {
          data: projects,
          status: 200,
          message: "Projects fetched successfully",
        });
      }

      // Find skills matching the search term
      const matchingSkills = await SkillsModel.find({
        skillName: { $regex: search, $options: "i" },
      });

      const skillIds = matchingSkills.map((skill) => skill._id);

      // Build query to search by project name OR by technology
      const queryConditions = [];

      // Search by project name
      queryConditions.push({
        projectName: { $regex: search, $options: "i" },
      });

      // Search by technology if skills found
      if (skillIds.length > 0) {
        queryConditions.push({
          "technologies.name": { $in: skillIds },
        });
      }

      // Find projects matching either condition
      const projects = await ProjectModel.find({
        $or: queryConditions,
      })
        .populate({
          path: "technologies",
          populate: {
            path: "name",
          },
        })
        .select("-__v")
        .limit(50);

      return this.sendResponse(req, res, {
        data: projects,
        status: 200,
        message: "Projects fetched successfully",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };

  // Get all prompts
  getPrompts = async (req, res) => {
    try {
      const prompts = await PromptModel.find({})
        .select("-__v")
        .sort({ createdAt: -1 });

      return this.sendResponse(req, res, {
        data: prompts,
        status: 200,
        message: "Prompts fetched successfully",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };

  // Search prompts by title
  searchPrompts = async (req, res) => {
    try {
      const { search } = req.query;

      if (!search) {
        return this.getPrompts(req, res);
      }

      const prompts = await PromptModel.find({
        title: { $regex: search, $options: "i" },
      })
        .select("-__v")
        .sort({ createdAt: -1 });

      return this.sendResponse(req, res, {
        data: prompts,
        status: 200,
        message: "Prompts fetched successfully",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };

  // Helper function to get available models
  getAvailableModels = async (apiKey) => {
    // Try v1 API first, then v1beta
    const endpoints = [
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    ];
    
    for (const url of endpoints) {
      try {
        const models = await new Promise((resolve, reject) => {
          https.get(url, (res) => {
            let data = "";
            res.on("data", (chunk) => {
              data += chunk;
            });
            res.on("end", () => {
              try {
                const jsonData = JSON.parse(data);
                if (jsonData.error) {
                  reject(new Error(jsonData.error.message));
                } else {
                  resolve(jsonData.models || []);
                }
              } catch (error) {
                reject(error);
              }
            });
          }).on("error", (error) => {
            reject(error);
          });
        });
        if (models && models.length > 0) {
          return models;
        }
      } catch (error) {
        console.log(`Error fetching models from ${url}:`, error.message);
        continue;
      }
    }
    return [];
  };

  // Generate proposal using Gemini
  generateProposal = async (req, res) => {
    try {
      const { developer, projects, videos, promptTemplate, jobDescription } = req.body;

      if (!developer || !promptTemplate || !jobDescription) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Developer, prompt template, and job description are required",
          status: 400,
        });
      }

      // Initialize Gemini - Load API key from database
      const apiKey = await Settings.getApiKey();
      
      if (!apiKey) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Gemini API key is not configured. Please set it in Settings.",
          status: 400,
        });
      }
      
      const genAI = new GoogleGenerativeAI(apiKey);

      // Get available models
      const availableModels = await this.getAvailableModels(apiKey);
      console.log("Available models:", availableModels.map(m => m.name));
      
      // Find all models that support generateContent
      const supportedModels = [];
      for (const model of availableModels) {
        if (model.supportedGenerationMethods && 
            model.supportedGenerationMethods.includes("generateContent")) {
          // Extract model name (remove 'models/' prefix if present)
          const modelName = model.name.replace("models/", "");
          supportedModels.push(modelName);
        }
      }
      
      console.log("Supported models for generateContent:", supportedModels);

      // Format the payload for the prompt - simplified structure
      const projectsText = projects && projects.length > 0
        ? projects
            .map((project) => {
              const projectName = project.projectName || "N/A";
              const description = project.description || "N/A";
              const projectLink = project.projectLink || "N/A";
              return `- ${projectName}: ${description}. Link: ${projectLink}`;
            })
            .join("\n\n")
        : "No projects selected";

      const videosText = videos && videos.length > 0
        ? videos
            .map((video) => {
              const title = video.title || "N/A";
              const link = video.link || "N/A";
              return `- ${title}: ${link}`;
            })
            .join("\n")
        : "No videos selected";

      // Build the full prompt - simplified payload
      const fullPrompt = `${promptTemplate}

DEVELOPER INFORMATION:
Name: ${developer.name || "N/A"}
About: ${developer.about || "N/A"}

RELEVANT PROJECTS:
${projectsText}

VIDEOS:
${videosText}

JOB DESCRIPTION:
${jobDescription}

Please generate a professional Upwork proposal based on the above information.`;

      // Build model list: use supported models first, then fallback to known working models
      const modelNames = [];
      
      // Add supported models from API (prioritize non-flash models to avoid quota issues)
      if (supportedModels.length > 0) {
        // Sort: prefer pro models, then flash-lite, then flash
        const sortedModels = supportedModels.sort((a, b) => {
          if (a.includes('pro') && !b.includes('pro')) return -1;
          if (!a.includes('pro') && b.includes('pro')) return 1;
          if (a.includes('lite') && !b.includes('lite')) return -1;
          if (!a.includes('lite') && b.includes('lite')) return 1;
          return 0;
        });
        modelNames.push(...sortedModels);
      }
      
      // Fallback to known working models (current Gemini 2.x models)
      const fallbackModels = [
        "gemini-2.5-pro",
        "gemini-2.0-flash",
        "gemini-2.5-flash-lite",
        "gemini-2.0-flash-lite"
      ];
      
      // Add fallbacks that aren't already in the list
      for (const fallback of fallbackModels) {
        if (!modelNames.includes(fallback)) {
          modelNames.push(fallback);
        }
      }
      
      console.log("Trying models in order:", modelNames);
      
      let proposal;
      let lastError;
      let quotaExceeded = false;
      
      for (const modelName of modelNames) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(fullPrompt);
          const response = await result.response;
          proposal = response.text();
          console.log(`Successfully used model: ${modelName}`);
          break; // Success, exit loop
        } catch (err) {
          lastError = err;
          console.log(`Failed to use model ${modelName}:`, err.message);
          
          // Check if it's a quota error
          if (err.message && (err.message.includes("429") || err.message.includes("quota"))) {
            quotaExceeded = true;
            console.log(`Quota exceeded for ${modelName}, trying next model...`);
          }
          
          continue; // Try next model
        }
      }
      
      if (!proposal) {
        let errorMsg = `All Gemini models failed. Last error: ${lastError?.message || "Unknown error"}. `;
        
        if (quotaExceeded) {
          errorMsg += `\nQuota exceeded for free tier models. You've reached the daily limit (20 requests/day). ` +
            `Please wait or upgrade your Google Cloud plan. ` +
            `Available models: ${supportedModels.join(", ") || "Could not fetch"}.`;
        } else {
          errorMsg += `Available models: ${supportedModels.join(", ") || availableModels.map(m => m.name).join(", ") || "Could not fetch"}. ` +
            `Please check your API key permissions in Google Cloud Console.`;
        }
        
        throw new Error(errorMsg);
      }

      return this.sendResponse(req, res, {
        data: { proposal },
        status: 200,
        message: "Proposal generated successfully",
      });
    } catch (error) {
      console.log("Gemini API Error:", error);
      return this.sendResponse(req, res, {
        data: null,
        message: error.message || "Failed to generate proposal",
        status: 500,
      });
    }
  };

  // Chat recraft using Gemini with full conversation context
  chatRecraft = async (req, res) => {
    try {
      const {
        developer,
        projects,
        videos,
        jobDescription,
        conversationHistory,
        currentProposal,
        newUserRequest,
      } = req.body;

      if (!developer || !jobDescription || !currentProposal || !newUserRequest) {
        return this.sendResponse(req, res, {
          data: null,
          message:
            "Developer, job description, current proposal, and new user request are required",
          status: 400,
        });
      }

      // Initialize Gemini - Load API key from database
      const apiKey = await Settings.getApiKey();

      if (!apiKey) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Gemini API key is not configured. Please set it in Settings.",
          status: 400,
        });
      }

      const genAI = new GoogleGenerativeAI(apiKey);

      // Get available models
      const availableModels = await this.getAvailableModels(apiKey);
      console.log(
        "Available models (chat recraft):",
        availableModels.map((m) => m.name)
      );

      // Find all models that support generateContent
      const supportedModels = [];
      for (const model of availableModels) {
        if (
          model.supportedGenerationMethods &&
          model.supportedGenerationMethods.includes("generateContent")
        ) {
          // Extract model name (remove 'models/' prefix if present)
          const modelName = model.name.replace("models/", "");
          supportedModels.push(modelName);
        }
      }

      console.log(
        "Supported models for generateContent (chat recraft):",
        supportedModels
      );

      // Format projects text
      const projectsText =
        projects && projects.length > 0
          ? projects
              .map((project) => {
                const projectName = project.projectName || "N/A";
                const description = project.description || "N/A";
                const projectLink = project.projectLink || "N/A";
                return `- ${projectName}: ${description}. Link: ${projectLink}`;
              })
              .join("\n\n")
          : "No projects provided";

      // Format videos text
      const videosText =
        videos && videos.length > 0
          ? videos
              .map((video) => {
                const title = video.title || "N/A";
                const link = video.link || "N/A";
                return `- ${title}: ${link}`;
              })
              .join("\n")
          : "No videos provided";

      // Format conversation history
      const historyText =
        conversationHistory && conversationHistory.length > 0
          ? conversationHistory
              .map((m) => {
                const role = m.role === "user" ? "User" : "Assistant";
                return `${role}: ${m.content || ""}`;
              })
              .join("\n\n")
          : "No previous conversation history.";

      // System-style instructions for the chat agent
      const chatSystemPrompt = `You are an AI assistant that specializes in recrafting Upwork job proposals through an interactive chat.

You will always receive the following data in each request:
- Developer info: the freelancer's name and "about" summary.
- Projects: a list of past projects, each with a name, description, and project link.
- Videos (if any): a list of video case studies, each with a title and link.
- Job description: the client's job post text.
- Conversation history: all previous messages between the user and assistant in this chat, including earlier proposal versions and user requests.
- Current proposal: the latest version of the proposal that you should use as the base for recrafting.
- New user request: the latest instruction from the user about how to change or improve the proposal.

Your role and behavior:
- You are a chat agent only for recrafting proposals, not for writing about anything else.
- You must carefully read and respect the developer info, projects, project links, videos, and job description so that all details in the proposal remain accurate and consistent.
- Use the full conversation history to understand what has already been changed, what the user liked or didn't like, and what the current style and tone are.
- Always treat the current proposal as the starting point, and apply the new user request on top of it (for example, make it shorter, more friendly, more technical, more focused on a specific project, etc.).
- Preserve all factual details such as developer name, project names, project links, video links, and important achievements, unless the user explicitly asks you to change or remove them.
- Maintain a professional, clear, and client-friendly tone suitable for an Upwork proposal.

Output requirements (very important):
- Return ONLY the recrafted proposal text.
- Do NOT include explanations, commentary, notes, or meta-text.
- Do NOT say things like "Here is the recrafted proposal:" or "Sure, I updated it as follows:".
- Start directly with the proposal content and end with the proposal content.`;

      // Build the full prompt for chat recraft
      const fullPrompt = `${chatSystemPrompt}

DEVELOPER INFORMATION:
Name: ${developer.name || "N/A"}
About: ${developer.about || "N/A"}

RELEVANT PROJECTS:
${projectsText}

VIDEOS:
${videosText}

JOB DESCRIPTION:
${jobDescription}

CONVERSATION HISTORY:
${historyText}

CURRENT PROPOSAL:
${currentProposal}

NEW USER REQUEST:
${newUserRequest}

Now recraft the proposal based on the user's latest request while maintaining all important, factual details. Return ONLY the recrafted proposal text, with no explanations or extra commentary.`;

      // Build model list: use supported models first, then fallback to known working models
      const modelNames = [];

      if (supportedModels.length > 0) {
        const sortedModels = supportedModels.sort((a, b) => {
          if (a.includes("pro") && !b.includes("pro")) return -1;
          if (!a.includes("pro") && b.includes("pro")) return 1;
          if (a.includes("lite") && !b.includes("lite")) return -1;
          if (!a.includes("lite") && b.includes("lite")) return 1;
          return 0;
        });
        modelNames.push(...sortedModels);
      }

      const fallbackModels = [
        "gemini-2.5-pro",
        "gemini-2.0-flash",
        "gemini-2.5-flash-lite",
        "gemini-2.0-flash-lite",
      ];

      for (const fallback of fallbackModels) {
        if (!modelNames.includes(fallback)) {
          modelNames.push(fallback);
        }
      }

      console.log("Trying models in order (chat recraft):", modelNames);

      let proposal;
      let lastError;
      let quotaExceeded = false;

      for (const modelName of modelNames) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(fullPrompt);
          const response = await result.response;
          proposal = response.text();
          console.log(`Successfully used model for chat recraft: ${modelName}`);
          break;
        } catch (err) {
          lastError = err;
          console.log(
            `Failed to use model ${modelName} for chat recraft:`,
            err.message
          );

          if (err.message && (err.message.includes("429") || err.message.includes("quota"))) {
            quotaExceeded = true;
            console.log(
              `Quota exceeded for ${modelName} (chat recraft), trying next model...`
            );
          }

          continue;
        }
      }

      if (!proposal) {
        let errorMsg = `All Gemini models failed for chat recraft. Last error: ${
          lastError?.message || "Unknown error"
        }. `;

        if (quotaExceeded) {
          errorMsg +=
            "\nQuota exceeded for free tier models. You've reached the daily limit (20 requests/day). " +
            "Please wait or upgrade your Google Cloud plan.";
        } else {
          errorMsg +=
            `Available models: ${
              supportedModels.join(", ") || availableModels.map((m) => m.name).join(", ")
            } or could not fetch. ` +
            "Please check your API key permissions in Google Cloud Console.";
        }

        throw new Error(errorMsg);
      }

      return this.sendResponse(req, res, {
        data: { proposal },
        status: 200,
        message: "Proposal recrafted successfully",
      });
    } catch (error) {
      console.log("Gemini Chat Recraft API Error:", error);
      return this.sendResponse(req, res, {
        data: null,
        message: error.message || "Failed to recraft proposal",
        status: 500,
      });
    }
  };
}

module.exports = { Extension };

