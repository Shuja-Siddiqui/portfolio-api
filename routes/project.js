const route = require("express").Router();
const multer = require("multer");
const { setResponse } = require("../utils");
const { Project, File } = require("../models/model");
const auth = require("../middlewares/authentication");
const ObjectId = require("mongoose").Types.ObjectId;
const upload = multer();

route.get("/:uid", async (req, res) => {
  try {
    const project = await Project.find({ user_id: req.params.uid });
    return setResponse(res, null, project, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/single-project/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    return setResponse(res, null, project, 200);
  } catch {
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

    const project = await Project.updateOne(
      { _id: id },
      {
        $set: { image: newFile?._id },
      }
    );
    if (project)
      return setResponse(res, "Data updated", null, 200);
    return setResponse(res, "Project not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/:uid", auth, upload.single("image"), async (req, res) => {
  try {
    const { project_name, description, link } = req.body;
    const uid = new ObjectId(req.params.uid);
    const { buffer } = req.file;
    const extension = req?.file?.mimetype;

    const newFile = new File({
      file_code: buffer,
      extension,
    });

    await newFile.save();

    const project = new Project({
      project_name,
      description,
      link,
      image: newFile._id,
      user_id: uid,
    });

    const savedProject = await project.save();

    return setResponse(res, "new", savedProject, 201);
  } catch (error) {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.patch("/:id", async (req, res) => {
  try {
    const { project_name, description, link } = req.body;
    const id = new ObjectId(req.params.id);
    const project = await Project.updateOne(
      { _id: id },
      {
        $set: { project_name, description, link },
      }
    );
    if (project && project.matchedCount > 0)
      return setResponse(res, "Data updated", null, 200);
    return setResponse(res, "project not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.deleteOne({ _id: req.params.id });
    if (project && project.deletedCount > 0)
      return setResponse(res, "Data Deleted", null, 204);
    return setResponse(res, "project not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
