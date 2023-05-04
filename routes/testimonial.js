const route = require("express").Router();
const { setResponse } = require("../utils");
const { Testimonial } = require("../models/model");
const auth = require("../middlewares/authentication");
const ObjectId = require("mongoose").Types.ObjectId;

route.get("/:uid", auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.find({ user_id: req.params.uid });
    return setResponse(res, null, testimonial, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/:id", auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({ _id: req.params.id });
    return setResponse(res, null, testimonial, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/:uid", auth, async (req, res) => {
  try {
    const { client_name, review, stars, field } = req.body;
    const uid = new ObjectId(req.params.uid);
    const testimonial = new Testimonial({
      client_name,
      review,
      stars,
      field,
      user_id: uid,
    });
    const response = await testimonial.save();
    return setResponse(res, "new", response, 201);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.put("/:id", auth, async (req, res) => {
  try {
    const { client_name, review, stars, field } = req.body;
    const id = new ObjectId(req.params.id);
    const testimonial = await Testimonial.updateOne(
      { _id: id },
      {
        $set: { client_name, review, stars, field },
      }
    );
    if (testimonial && testimonial.matchedCount > 0)
      return setResponse(res, "Data updated", null, 200);
    return setResponse(res, "Testimonial not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id", auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.deleteOne({ _id: req.params.id });
    if (testimonial && testimonial.deletedCount > 0)
      return setResponse(res, "Data Deleted", null, 500);
    return setResponse(res, "Testimonial not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
