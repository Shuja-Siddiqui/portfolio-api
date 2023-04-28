const route = require("express").Router();
const user_info = require("./user_info");
const developer_info = require("./developer_info");
const service = require("./service");
const project = require("./project");
const testimonial = require("./testimonial");


route.use("/user_info", user_info);
route.use("/developer_info", developer_info);
route.use("/service", service);
route.use("/project", project);
route.use("/testimonial", testimonial);


module.exports = route;