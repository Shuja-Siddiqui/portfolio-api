const mongoose = require("mongoose");

const education = mongoose.Schema({
  devId: {
    type: mongoose.Types.ObjectId,
    ref: "Developer",
  },
  institution: {
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
  major: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const EducationsModel = mongoose.model("Education", education);
module.exports = { EducationsModel };
