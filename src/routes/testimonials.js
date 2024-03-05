const router = require("express").Router();
const { Testimonials } = require("../handlers");

const handlers = new Testimonials();

router.post("/", handlers.addTestimonial);
router.get("/all/testimonial", handlers.getTestimonials);
router.get("/:id", handlers.getTestimonial);
router.put("/:id", handlers.updateTestimonial);

module.exports = router;
