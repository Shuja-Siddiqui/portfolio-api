const router = require("express").Router();
const { Prompt } = require("../handlers");

const handlers = new Prompt();

router.post("/", handlers.addPrompt);
router.get("/all/prompts", handlers.getPrompts);
router.get("/:id", handlers.getPrompt);
router.put("/:id", handlers.updatePrompt);
router.delete("/:id", handlers.deletePrompt);

module.exports = router;

