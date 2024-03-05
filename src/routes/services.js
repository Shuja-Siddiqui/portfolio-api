const router = require("express").Router();
const { Services } = require("../handlers");

const handlers = new Services();

router.post("/", handlers.addService);
router.get("/all/service", handlers.getServices);
router.get("/:id", handlers.getService);
router.put("/:id", handlers.updateService);

module.exports = router;
