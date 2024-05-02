const router = require("express").Router();
const { Skills } = require("../handlers");

const handlers = new Skills();

router.post("/", handlers.addSkill);
router.get("/all/skills", handlers.getSkills);
router.get("/:id", handlers.getSkill);
router.patch("/:id", handlers.updateSkill);
router.delete("/:id", handlers.removeSkill);

module.exports = router;
