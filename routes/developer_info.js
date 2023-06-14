const route = require("express").Router();
const multer = require("multer");
const { setResponse } = require("../utils");
const { DeveloperInfo, Users, File } = require("../models/model");
const auth = require("../middlewares/authentication");
const upload = multer();

route.get("/:uid", async (req, res) => {
  try {
    const developers = await DeveloperInfo.findOne({
      user_id: req.params.uid,
    });
    return setResponse(res, null, developers, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.patch("/file/:uid", auth, upload.single("image"), async (req, res) => {
  const uid = req.params.uid;
  try {
    const { buffer } = req.file;
    const extension = req?.file?.mimetype;

    const newFile = new File({
      file_code: buffer,
      extension,
    });

    await newFile.save();

    const developer = await DeveloperInfo.findOneAndUpdate(
      { user_id: uid },
      {
        $set: { image: newFile?._id },
      }
    );
    if (developer) return setResponse(res, "Data updated", null, 200);
    return setResponse(res, "Developer not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.patch("/:uid", auth, async (req, res) => {
  console.log("updating text", req.body);
  try {
    const { name, address, field, email, phone, about, links } = req.body;

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
          links,
        },
      }
    );

    if (developers) return setResponse(res, "Data updated", null, 200);

    return setResponse(res, "User not found", null, 404);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
