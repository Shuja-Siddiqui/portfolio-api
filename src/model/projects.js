const mongoose = require("mongoose");

const projects = mongoose.Schema({
  projectName: {
    type: String,
    required: true,
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
  technologies: [
    {
      name: {
        type: mongoose.Types.ObjectId,
        ref: "Technologies",
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
