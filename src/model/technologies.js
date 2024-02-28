const mongoose = require("mongoose");

const technologies = mongoose.Schema({
  techName: {
    type: String,
    required: true,
    unique: true,
  },
});

const TechnologiesModel = mongoose.model("Technologies", technologies);
module.exports = { TechnologiesModel };
