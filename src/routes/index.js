const router = require("express").Router();
const file = require("./file");
const auth = require("./auth");
const skill = require("./skill");
const tech = require("./technologies");
const project = require("./project");
const developer = require("./developer");

// Routes
router.use("/file", file);
router.use("/auth", auth);
router.use("/skill", skill);
router.use("/tech", tech);
router.use("/project", project);
router.use("/developer", developer);

module.exports = { router };
