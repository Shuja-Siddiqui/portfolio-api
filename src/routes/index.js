const router = require("express").Router();
const file = require("./file");
const auth = require("./auth");
const skill = require("./skill");
const tech = require("./technologies");
const project = require("./project");
const developer = require("./developer");
const testimonial = require("./testimonials");
const service = require("./services");

// Routes
router.use("/file", file);
router.use("/auth", auth);
router.use("/skill", skill);
router.use("/tech", tech);
router.use("/project", project);
router.use("/developer", developer);
router.use("/testimonial", testimonial);
router.use("/service", service);

module.exports = { router };
