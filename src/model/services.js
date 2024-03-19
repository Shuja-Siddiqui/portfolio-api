const mongoose = require("mongoose");

const services = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ServicesModel = mongoose.model("Services", services);
module.exports = { ServicesModel };
