const router = require("express").Router();
const { Experience } = require("../handlers");

const handlers = new Experience();

router.post("/", handlers.addExperience);
router.get("/all/experience", handlers.getExperiences);
router.get("/:id", handlers.getExperience);
router.put("/:id", handlers.updateExperience);

module.exports = router;
