const mongoose = require("mongoose");

const video = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  developerID: {
    type: mongoose.Types.ObjectId,
    ref: "Developer",
    default: null,
  },
  projectID: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    default: null,
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

const VideoModel = mongoose.model("Video", video);
module.exports = { VideoModel };
