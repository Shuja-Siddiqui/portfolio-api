const router = require("express").Router();
const { Projects } = require("../handlers");

const handlers = new Projects();

router.post("/", handlers.addProject);
router.get("/:id", handlers.getProject);
router.get("/all/projects", handlers.getProjects);
router.put("/:id", handlers.updateProject);

module.exports = router;
