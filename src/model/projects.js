const mongoose = require("mongoose");

const projects = mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  thumbNail: {
    required: true,
    type: String,
  },
  clientName: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    required: true,
    type: String,
  },
  hero: {
    type: mongoose.Types.ObjectId,
    ref: "File",
  },
  techStack: {
    type: String,
    required: true,
  },
  projectLink: {
    type: String,
  },
  gallery: [{ type: mongoose.Types.ObjectId, ref: "File" }],
  technologies: [
    {
      name: {
        type: mongoose.Types.ObjectId,
        ref: "Skills",
      },
      level: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
});
const ProjectModel = mongoose.model("Project", projects);

module.exports = { ProjectModel };
