const router = require("express").Router();
const { Mail } = require("../handlers");

const handlers = new Mail();

router.post("/", handlers.addMail);

module.exports = router;
