const mongoose = require("mongoose");

const experience = mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  timeSpan: {
    startYear: {
      type: Number,
      required: true,
    },
    endYear: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  /** Owning developer — used by admin to show ownership */
  devId: {
    type: mongoose.Types.ObjectId,
    ref: "Developer",
    required: false,
  },
});

const ExperiencesModel = mongoose.model("Experience", experience);
module.exports = { ExperiencesModel };
