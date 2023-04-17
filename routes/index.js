const router = require("express").Router();
const dev = require("./dev_information");

router.use("/dev_information", dev);

module.exports = router;