const router = require("express").Router();
const { Educations } = require("../handlers");

const handlers = new Educations();

router.post("/", handlers.addEducation);
router.get("/all/education", handlers.getEducations);
router.get("/:id", handlers.getEducation);
router.put("/:id", handlers.updateEducation);
router.delete("/:id", handlers.deleteEducation)

module.exports = router;
