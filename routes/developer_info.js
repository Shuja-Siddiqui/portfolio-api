const route = require("express").Router();
const { setResponse } = require("../utils");
const data = require("./data");

route.get("/:uid", (req, res) => {
    try {
      return setResponse(
        res,
        null,
        data[parseInt(req.params.uid)].dev_information,
        200
      );
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  route.put("/:uid", (req, res) => {
    try {
      const { name, field, email, phone, about } = req.body;
      if (!name || !field || !email || !phone || !about) {
        return setResponse(res, "All fields are required", null, 405);
      }
      const { _id } =
        data[parseInt(req.params.uid)].dev_information[parseInt(req.params.id)];
      data[parseInt(req.params.uid)].dev_information = {
        _id,
        name,
        field,
        email,
        phone,
        about,
      };
      return setResponse(res, "Data updated", null, 200);
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });


  module.exports = route;