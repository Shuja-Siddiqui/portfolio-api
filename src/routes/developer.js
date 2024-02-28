const router = require("express").Router();
const { Developer } = require("../handlers");

const handlers = new Developer();

router.post("/", handlers.addDeveloper);
router.get("/:id", handlers.getDeveloper);
router.get("/all/developers", handlers.getDevelopers);
router.put("/:id", handlers.updateDeveloper);

module.exports = router;
