const route = require("express").Router();
const user_info = require("./user_info");
const developer_info = require("./developer_info");
const service = require("./service");
const project = require("./project");
const testimonial = require("./testimonial");
const login_authentication = require("./login_authentication");
const { default: mongoose } = require("mongoose");

const MONGO_URI =
  "mongodb+srv://ShujaUrRehman:shuja1234@portfolio.s7bz7a9.mongodb.net/?retryWrites=true&w=majority";
console.log(MONGO_URI);

mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection  error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

route.use("/user_info", user_info);
route.use("/developer_info", developer_info);
route.use("/service", service);
route.use("/project", project);
route.use("/testimonial", testimonial);
route.use("/login", login_authentication);

module.exports = route;
