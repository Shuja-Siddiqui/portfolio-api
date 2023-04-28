const route = require("express").Router();
const { setResponse } = require("../utils");
const data = require("./data");


route.get("/:uid", (req, res) => {
    try {
      return setResponse(res, null, data[parseInt(req.params.uid)].projects, 200);
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });
  
  route.get("/:uid/:id", (req, res) => {
    try {
      return setResponse(
        res,
        null,
        data[parseInt(req.params.uid)].projects[parseInt(req.params.id)],
        200
      );
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  route.post("/:uid", (req, res) => {
    try {
      const { project_name, description, link } = req.body;
      data[parseInt(req.params.uid)].projects.push({
        _id: data[parseInt(req.params.uid)].projects.length + 1,
        project_name,
        description,
        link,
      });
      return setResponse(res, "new", null, 201);
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  route.put("/:uid/:id", (req, res) => {
    try {
      const { project_name, description, link } = req.body;
      if (!project_name || !description || !link) {
        return setResponse(res, "All fields are required", null, 405);
      }
      data[parseInt(req.params.uid)].projects[parseInt(req.params.id)] = {
        project_name,
        description,
        link,
      };
      return setResponse(res, "Data updated", null, 200);
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  route.delete("/:uid/:id", (req, res) => {
    try {
      data[parseInt(req.params.uid)].projects = data[
        parseInt(req.params.uid)
      ].projects.filter((items) => items._id != parseInt(req.params.id));
      return setResponse(res, "Data Deleted", null, 500);
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  module.exports = route;