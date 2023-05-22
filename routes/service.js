const route = require("express").Router();
const { setResponse } = require("../utils");
const auth = require("../middlewares/authentication");
const { Service } = require("../models/model");
const ObjectId = require("mongoose").Types.ObjectId;

route.get("/:uid",  async (req, res) => {
  try {
    const service = await Service.find({ user_id: req.params.uid });
    return setResponse(res, null, service, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/single-service/:id",  async (req, res) => {
  try {
    const service = await Service.findOne({ _id: req.params.id });
    return setResponse(res, null, service, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/:uid",  async (req, res) => {
  try {
    const { name, description } = req.body;
    const uid = new ObjectId(req.params.uid);
    const service = new Service({
      name,
      description,
      user_id: uid,
    });
    const response = await service.save();
    return setResponse(res, "new", response, 201);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.put("/:id",  async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = new ObjectId(req.params.id);
    const service = await Service.updateOne(
      { _id: id },
      {
        $set: { name, description },
      }
    );
    if (service && service.matchedCount > 0)
      return setResponse(res, "Data updated", null, 200);
    return setResponse(res, "service not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.delete("/:id",  async (req, res) => {
  try {
    const service = await Service.deleteOne({ _id: req.params.id });
    if (service && service.deletedCount > 0)
      return setResponse(res, "Service deleted", null, 200);
    return setResponse(res, "Service not found", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
