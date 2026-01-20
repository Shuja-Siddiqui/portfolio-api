const mongoose = require("mongoose");

const prompt = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PromptModel = mongoose.model("Prompt", prompt);
module.exports = { PromptModel };

