const router = require("express").Router();
const { Skills } = require("../handlers");

const handlers = new Skills();

router.post("/", handlers.addSkill);
router.get("/:id", handlers.getSkill);
router.patch("/:id", handlers.updateSkill);

module.exports = router;
