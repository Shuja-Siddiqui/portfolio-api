const route = require("express").Router();
const { setResponse } = require("../utils");
const { Project } = require("../models/model");
const auth = require("../middlewares/authentication");
const ObjectId = require("mongoose").Types.ObjectId;

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

route.post("/:uid", async (req, res) => {
  try {
    const { project_name, description, link } = req.body;
    const uid = new ObjectId(req.params.uid);
    const project = new Project({
      project_name,
      description,
      link,
      user_id: uid,
    });
    console.log(project);
    const response = await project.save();
    return setResponse(res, "new", response, 201);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.put("/:id", async (req, res) => {
  try {
    const { project_name, description, link } = req.body;
    const id = new ObjectId(req.params.id);
    const project = await Project.updateOne(
      { _id: id },
      {
        $set : {project_name, description, link,}
      }
    );
    if (project && project.matchedCount > 0)
      return setResponse(res, "Data updated", null, 200);
    return setResponse(res, "project not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const project = await Project.deleteOne({ _id: req.params.id });
    if (project && project.deletedCount > 0)
      return setResponse(res, "Data Deleted", null, 500);
    return setResponse(res, "project not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
