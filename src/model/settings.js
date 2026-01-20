const mongoose = require("mongoose");

const settings = mongoose.Schema({
  geminiApiKey: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure only one settings document exists
settings.statics.getSettings = async function () {
  let settingsDoc = await this.findOne();
  if (!settingsDoc) {
    settingsDoc = await this.create({ geminiApiKey: "" });
  }
  return settingsDoc;
};

const SettingsModel = mongoose.model("Settings", settings);
module.exports = { SettingsModel };
