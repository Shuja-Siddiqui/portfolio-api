const router = require("express").Router();
const { Extension } = require("../handlers");

const handlers = new Extension();

// Developer endpoints
router.get("/developers", handlers.getDevelopers);
router.get("/developer/:id", handlers.getDeveloper);

// Project search endpoint
router.get("/projects", handlers.searchProjects);

// Prompt endpoints
router.get("/prompts", handlers.getPrompts);
router.get("/prompts/search", handlers.searchPrompts);

// Generate proposal endpoint
router.post("/generate-proposal", handlers.generateProposal);

// Chat recraft endpoint - uses full chat history and current proposal
router.post("/chat-recraft", handlers.chatRecraft);

module.exports = router;

