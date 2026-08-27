const mongoose = require("mongoose");

const contentBlock = {
  format: {
    type: String,
    enum: ["paragraph", "bullets"],
    default: "paragraph",
  },
  text: {
    type: String,
    default: "",
  },
  items: {
    type: [String],
    default: [],
  },
};

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
  /** classic = existing layout; showcase = carousel + problem/solution + FAQs */
  detailLayout: {
    type: String,
    enum: ["classic", "showcase"],
    default: "classic",
  },
  youtubeUrl: {
    type: String,
    default: "",
  },
  problem: {
    type: contentBlock,
    default: () => ({ format: "paragraph", text: "", items: [] }),
  },
  solution: {
    type: contentBlock,
    default: () => ({ format: "paragraph", text: "", items: [] }),
  },
  faqs: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
});
const ProjectModel = mongoose.model("Project", projects);

module.exports = { ProjectModel };
