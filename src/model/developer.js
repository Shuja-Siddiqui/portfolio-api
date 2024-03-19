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
  languages: {
    type: [
      {
        type: String,
        required: true,
        enum: [
          "english",
          "spanish",
          "hindi",
          "french",
          "arabic",
          "bengali",
          "russian",
          "portuguese",
          "indonesian",
          "urdu",
          "german",
          "japanese",
          "swahili",
          "marathi",
          "telugu",
          "turkish",
          "tamil",
          "punjabi",
          "chinese",
        ],
      },
    ],
  },
  availability: {
    type: [
      {
        type: String,
        required: true,
        enum: ["part", "full", "internship", "job"],
      },
    ],
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
  education: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Education",
    },
  ],
  experience: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Experience",
    },
  ],
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
