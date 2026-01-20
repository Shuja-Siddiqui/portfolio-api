const router = require("express").Router();
const { Settings } = require("../handlers");

const handlers = new Settings();

// Settings endpoints
router.get("/api-key", handlers.getApiKey);
router.put("/api-key", handlers.updateApiKey);
router.post("/api-key/refresh", handlers.refreshApiKey);

module.exports = router;
