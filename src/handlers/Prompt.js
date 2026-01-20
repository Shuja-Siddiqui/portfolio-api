const { PromptModel } = require("../model");
const Response = require("./Response");

class Prompt extends Response {
  addPrompt = async (req, res) => {
    try {
      const { title, prompt } = req.body;

      if (!title || !prompt) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Title and prompt are required",
          status: 400,
        });
      }

      const newPrompt = new PromptModel({
        title,
        prompt,
      });

      await newPrompt.save();

      return this.sendResponse(req, res, {
        data: newPrompt,
        message: "Prompt added successfully",
        status: 200,
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

  getPrompt = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Prompt ID is required",
          status: 400,
        });
      }

      const prompt = await PromptModel.findById(id).select("-__v");

      if (!prompt) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Prompt not found",
          status: 404,
        });
      }

      return this.sendResponse(req, res, {
        data: prompt,
        status: 200,
        message: "Prompt fetched successfully",
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

  updatePrompt = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, prompt } = req.body;

      if (!id) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Prompt ID is required",
          status: 400,
        });
      }

      const updatedPrompt = await PromptModel.findByIdAndUpdate(
        id,
        {
          title,
          prompt,
          updatedAt: new Date(),
        },
        { new: true }
      ).select("-__v");

      if (!updatedPrompt) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Prompt not found",
          status: 404,
        });
      }

      return this.sendResponse(req, res, {
        data: updatedPrompt,
        status: 200,
        message: "Prompt updated successfully",
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

  deletePrompt = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Prompt ID is required",
          status: 400,
        });
      }

      const prompt = await PromptModel.findByIdAndDelete(id);

      if (!prompt) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Prompt not found",
          status: 404,
        });
      }

      return this.sendResponse(req, res, {
        data: null,
        status: 200,
        message: "Prompt deleted successfully",
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
}

module.exports = { Prompt };

