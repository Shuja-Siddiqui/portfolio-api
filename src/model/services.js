const mongoose = require("mongoose");

const services = mongoose.Schema({
  name: {
    type: mongoose.Types.ObjectId,
    ref: "Skills",
  },
  description: {
    type: String,
    required: true,
  },
});

const ServicesModel = mongoose.model("Services", services);
module.exports = { ServicesModel };
