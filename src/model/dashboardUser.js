const mongoose = require("mongoose");

const dashboardUser = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const DashboardUserModel = mongoose.model("DashboardUser", dashboardUser);
module.exports = { DashboardUserModel };
