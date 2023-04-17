const router = require("express").Router();
const dev = require("./dev_information");
const service = require("./services");
const testimonials = require("./testimonials");

router.use("/dev_information", dev);
router.use("/services", service);
router.use("/testimonials", testimonials);

module.exports = router;