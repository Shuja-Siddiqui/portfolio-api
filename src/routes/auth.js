const router = require("express").Router();
const { Auth } = require("../handlers");

const handlers = new Auth();

// @route   GET api/auth
// @desc    Get a token for user
router.post("/login", handlers.login);
router.post("/signup", handlers.signup);
module.exports = router;
