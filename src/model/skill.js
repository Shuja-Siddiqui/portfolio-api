const mongoose = require("mongoose");

const skills = mongoose.Schema({
  skillName: {
    type: String,
    unique: true,
    required: true,
  },
});

const SkillsModel = mongoose.model("Skills", skills);

module.exports = { SkillsModel };
