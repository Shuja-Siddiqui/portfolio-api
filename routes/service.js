const route = require("express").Router();
const { setResponse } = require("../utils");
const data = require("./data");


route.get("/:uid", (req, res) => {
    try {
      return setResponse(res, null, data[parseInt(req.params.uid)].services, 200);
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });
  
  route.get("/:uid/:id", (req, res) => {
    try {
      return setResponse(
        res,
        null,
        data[parseInt(req.params.uid)].services[parseInt(req.params.id)],
        200
      );
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  route.post("/:uid", (req, res) => {
    try {
      const { name, description } = req.body;
      data[parseInt(req.params.uid)].services.push({
        _id: data[parseInt(req.params.uid)].services.length + 1,
        name,
        description,
      });
      return setResponse(res, "new", null, 201);
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  route.put("/:uid/:id", (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        return setResponse(res, "All fields are required", null, 405);
      }
      const { _id } =
        data[parseInt(req.params.uid)].services[parseInt(req.params.id)];
      data[parseInt(req.params.uid)].services[parseInt(req.params.id)] = {
        _id,
        name,
        description,
      };
      return setResponse(res, "Data updated", null, 200);
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  route.delete("/:uid/:id", (req, res) => {
    try {
      data[parseInt(req.params.uid)].services = data[
        parseInt(req.params.uid)
      ].services.filter((item) => item._id != parseInt(req.params.id));
      return setResponse(res, "data deleted", null, 200);
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  module.exports = route;
  