const mongoose = require("mongoose");

const testimonial = mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  clientReview: {
    type: String,
    required: true,
  },
  stars: {
    type: String,
    enum: [1, 2, 3, 4, 5],
  },
  clientImage: {
    type: mongoose.Types.ObjectId,
    ref: "File",
  },
});

const TestimonialsModel = mongoose.model("Testimonial", testimonial);
module.exports = { TestimonialsModel };
