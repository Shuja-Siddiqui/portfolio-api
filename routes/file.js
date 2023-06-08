const route = require("express").Router();
const multer = require("multer");
const { setResponse } = require("../utils");
const { File } = require("../models/model");

const storage = multer.memoryStorage();
const upload = multer({ storage });

route.post("/", upload.single("file"), async (req, res) => {
  try {
    const { buffer } = req.file;
    const extension = req?.file?.mimetype;

    const newFile = new File({
      file_code: buffer,
      extension,
    });

    await newFile.save();

    return res.status(200).json({
      message: "File uploaded successfully",
      data: newFile,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const response = await File.findOne({ _id: req.params.id });
    if (!response) return setResponse(res, "File not found", null, 404);
    res.contentType(response.extension);
    res.status(200).send(response.file_code);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
