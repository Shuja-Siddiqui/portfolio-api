const { SettingsModel } = require("../model");
const Response = require("./Response");

// Cache for API key to avoid database queries on every request
let cachedApiKey = null;

class Settings extends Response {
  // Get current API key (masked for security)
  getApiKey = async (req, res) => {
    try {
      const settings = await SettingsModel.getSettings();
      // Return masked version for display
      const maskedKey = settings.geminiApiKey
        ? settings.geminiApiKey.substring(0, 10) + "..." + settings.geminiApiKey.substring(settings.geminiApiKey.length - 4)
        : "";
      
      return this.sendResponse(req, res, {
        data: { 
          apiKey: maskedKey,
          hasKey: !!settings.geminiApiKey 
        },
        status: 200,
        message: "API key retrieved successfully",
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

  // Update API key
  updateApiKey = async (req, res) => {
    try {
      const { apiKey } = req.body;

      if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
        return this.sendResponse(req, res, {
          data: null,
          message: "API key is required",
          status: 400,
        });
      }

      // Get or create settings document
      let settings = await SettingsModel.findOne();
      if (!settings) {
        settings = await SettingsModel.create({ geminiApiKey: apiKey.trim() });
      } else {
        settings.geminiApiKey = apiKey.trim();
        settings.updatedAt = new Date();
        await settings.save();
      }

      // Update cache
      cachedApiKey = settings.geminiApiKey;

      return this.sendResponse(req, res, {
        data: { message: "API key updated successfully" },
        status: 200,
        message: "API key updated successfully",
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

  // Refresh API key (reload from database)
  refreshApiKey = async (req, res) => {
    try {
      // Clear cache first to ensure fresh load
      Settings.clearCache();
      
      const settings = await SettingsModel.getSettings();
      cachedApiKey = settings.geminiApiKey;

      return this.sendResponse(req, res, {
        data: { 
          message: "API key refreshed successfully",
          hasKey: !!cachedApiKey 
        },
        status: 200,
        message: "API key refreshed successfully",
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

  // Static method to get API key (used by Extension handler)
  static async getApiKey() {
    try {
      // Return cached key if available
      if (cachedApiKey) {
        return cachedApiKey;
      }

      // Load from database
      const settings = await SettingsModel.getSettings();
      cachedApiKey = settings.geminiApiKey;
      
      // Fallback to environment variable if database key is empty
      if (!cachedApiKey || cachedApiKey.trim() === "") {
        cachedApiKey = process.env.GEMINI_API_KEY || null;
      }

      return cachedApiKey;
    } catch (error) {
      console.error("Error loading API key:", error);
      // Fallback to environment variable on error
      return process.env.GEMINI_API_KEY || null;
    }
  }

  // Static method to clear cache (useful for testing or forced refresh)
  static clearCache() {
    cachedApiKey = null;
  }
}

module.exports = { Settings };
