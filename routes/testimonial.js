const route = require("express").Router();
const { setResponse } = require("../utils");
const { Testimonial, File } = require("../models/model");
const auth = require("../middlewares/authentication");
const multer = require("multer");
const ObjectId = require("mongoose").Types.ObjectId;
const upload = multer();

route.get("/:uid", async (req, res) => {
  try {
    const testimonial = await Testimonial.find({ user_id: req.params.uid });
    return setResponse(res, null, testimonial, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({ _id: req.params.id });
    return setResponse(res, null, testimonial, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/:uid", auth, upload.single("image"), async (req, res) => {
  console.log("Creating testimonial", req.body, "image is", req.file);
  const uid = new ObjectId(req.params.uid);
  try {
    const { client_name, review, stars, field } = req.body;
    const { buffer } = req.file;
    const extension = req?.file?.mimetype;

    const newFile = new File({
      file_code: buffer,
      extension,
    });

    await newFile.save();
    const testimonial = new Testimonial({
      client_name,
      review,
      stars,
      field,
      image: newFile?._id,
      user_id: uid,
    });
    const response = await testimonial.save();
    return setResponse(res, "new", response, 201);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const { client_name, review, stars, field } = req.body;
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      { _id: id },
      {
        client_name,
        review,
        stars,
        field,
      }
    );
    if (testimonial) return setResponse(res, "Data updated", null, 200);
    return setResponse(res, "Testimonial not found", null, 404);
  } catch (error) {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.patch("/file/:id", auth, upload.single("image"), async (req, res) => {
  const id = new ObjectId(req.params.id);
  try {
    const { buffer } = req.file;
    const extension = req?.file?.mimetype;

    const newFile = new File({
      file_code: buffer,
      extension,
    });

    await newFile.save();

    const testimonial = await Testimonial.updateOne(
      { _id: id },
      {
        $set: { image: newFile?._id },
      }
    );
    if (testimonial && testimonial.matchedCount > 0)
      return setResponse(res, "Data updated", null, 200);
    return setResponse(res, "Testimonial not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.deleteOne({ _id: req.params.id });
    if (testimonial && testimonial.deletedCount > 0)
      return setResponse(res, "Data Deleted", null, 204);
    return setResponse(res, "Testimonial not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
