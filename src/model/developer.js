const mongoose = require("mongoose");

const developer = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  devId: {
    type: String,
    required: true,
    unique: true,
  },
  about: { type: String, required: true },
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
  testimonials: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Testimonial",
    },
  ],
  services: [{ type: mongoose.Types.ObjectId, ref: "Services" }],
  links: [
    {
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  projects: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
});

const DeveloperModel = mongoose.model("Developer", developer);
module.exports = { DeveloperModel };
