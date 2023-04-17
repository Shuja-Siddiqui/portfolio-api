const router = require("express").Router();
const dev = require("./dev_information");
const service = require("./services");
const projects = require("./projects");

router.use("/dev_information", dev);
router.use("/services", service);
router.use("/projects", projects); 

module.exports = router;