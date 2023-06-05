const route = require("express").Router();
const { setResponse } = require("../utils");
const { DeveloperInfo, Users } = require("../models/model");
const auth = require("../middlewares/authentication");

route.get("/:uid", async (req, res) => {
  try {
    const developers = await DeveloperInfo.findOne({ user_id: req.params.uid });
    return setResponse(res, null, developers, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.put("/:uid", async (req, res) => {
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
          user_id: req.body.user_id,
          links,
        },
      }
    );
    if (developers && developers.modifiedCount > 0)
      return setResponse(res, "Data updated", null, 200);
    return setResponse(res, "User not foud", null, 404);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
