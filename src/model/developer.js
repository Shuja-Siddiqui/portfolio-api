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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  skype: {
    type: String,
    required: true,
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
    type: String,
    required: true,
  },
  about: { type: String, required: true },
  avatar: {
    type: mongoose.Types.ObjectId,
    ref: "File",
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  devCV: {
    type: String,
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
        required: false,
        default: 1,
      },
      /** Nominate for profile typed line under avatar */
      featured: {
        type: Boolean,
        required: false,
        default: false,
      },
      /** Display order under profile (1–5). Lower = first. */
      typedOrder: {
        type: Number,
        required: false,
        min: 1,
        max: 5,
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
  intro: {
    type: String,
    required: true,
  },
  introVideo: {
    type: String,
    required: false,
    default: "",
  },
});

const DeveloperModel = mongoose.model("Developer", developer);
module.exports = { DeveloperModel };
