const router = require("express").Router();
const dev = require("./dev_information");
const service = require("./services");

router.use("/dev_information", dev);
router.use("/services", service);

module.exports = router;