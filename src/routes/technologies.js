const router = require("express").Router();
const { Technologies } = require("../handlers");

const handlers = new Technologies();

router.post("/", handlers.addTech);
router.get("/:id", handlers.getTech);
router.patch("/:id", handlers.updateTech);

module.exports = router;
