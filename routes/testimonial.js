const route = require("express").Router();
const { setResponse } = require("../utils");
const data = require("./data");


route.get("/:uid", (req, res) => {
    try {
      return setResponse(
        res,
        null,
        data[parseInt(req.params.uid)].testimonials,
        200
      );
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });
  
  route.get("/:uid/:id", (req, res) => {
    try {
      return setResponse(
        res,
        null,
        data[parseInt(req.params.uid)].testimonials[parseInt(req.params.id)],
        200
      );
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  route.post("/:uid", (req, res) => {
    try {
      const { client_name, review, stars, field } = req.body;
      data[parseInt(req.params.uid)].testimonials.push({
        _id: data[parseInt(req.params.uid)].testimonials.length + 1,
        client_name,
        review,
        stars,
        field,
      });
      return setResponse(res, "new", null, 201);
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  route.put("/:uid/:id", (req, res) => {
    try {
      const { client_name, review, stars, field } = req.body;
      if (!client_name || !review || !stars || !field) {
        return setResponse(res, "All fields are required", null, 405);
      }
      const { _id } =
        data[parseInt(req.params.uid)].testimonials[parseInt(req.params.id)];
      data[parseInt(req.params.uid)].testimonials[parseInt(req.params.id)] = {
        _id,
        client_name,
        review,
        stars,
        field,
      };
      return setResponse(res, "Data updated", null, 200);
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  route.delete("/:uid/:id", (req, res) => {
    try {
      data[parseInt(req.params.uid)].testimonials = data[
        parseInt(req.params.uid)
      ].testimonials.filter((items) => items._id != parseInt(req.params.id));
      return setResponse(res, "Data Deleted", null, 500);
    } catch {
      return setResponse(res, "Internal Server Error", null, 500);
    }
  });

  module.exports = route;