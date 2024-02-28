const mongoose = require("mongoose");

const developer = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  devId: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: {
    type: mongoose.Types.ObjectId,
    ref: "File",
  },
  residence: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  skills: [
    {
      title: {
        type: mongoose.Types.ObjectId,
        ref: "Skills",
      },
      ratings: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  projects: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
});

const DeveloperModel = mongoose.model("Developer", developer);
module.exports = { DeveloperModel };
