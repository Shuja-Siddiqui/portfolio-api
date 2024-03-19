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
      type: Number,
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
});

const ExperiencesModel = mongoose.model("Experience", experience);
module.exports = { ExperiencesModel };
