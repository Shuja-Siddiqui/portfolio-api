const route = require("express").Router();
const multer = require("multer");
const { setResponse } = require("../utils");
const { DeveloperInfo, Users, File } = require("../models/model");
const auth = require("../middlewares/authentication");
const upload = multer();

route.get("/:uid", async (req, res) => {
  try {
    const developers = await DeveloperInfo.findOne({ user_id: req.params.uid }).populate('image');
    return setResponse(res, null, developers, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.put("/:uid", auth, upload.single("image"), async (req, res) => {
  console.log("Req body", req.body, "file is", req.file)
  try {
    const { name, address, field, email, phone, about, links } = req.body;
    const parsedLinks = JSON.parse(links)
    const extension = req.file?.originalname.split(".").pop();
    const file = req.file;

    const newFile = new File({
      file_code: file?.buffer,
      extension,
    });

    const savedFile = await newFile.save();

    const developers = await DeveloperInfo.updateOne(
      { user_id: req.params.uid },
      {
        $set: {
          name,
          address,
          field,
          email,
          phone,
          about,
          user_id: req.params.uid,
          links: parsedLinks,
          image: savedFile?._id || null,
        },
      }
    );

    if (developers && developers.nModified > 0)
      return setResponse(res, "Data updated", null, 200);

    return setResponse(res, "User not found(fake)", null, 200);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
