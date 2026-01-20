const router = require("express").Router();
const { Video } = require("../handlers");

const handlers = new Video();

router.post("/", handlers.addVideo);
router.get("/search", handlers.getVideosByDeveloperOrProject);
router.get("/:id", handlers.getVideo);
router.get("/all/videos", handlers.getVideos);
router.put("/:id", handlers.updateVideo);
router.delete("/:id", handlers.deleteVideo);

module.exports = router;
