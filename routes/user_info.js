const route = require("express").Router();
const { setResponse } = require("../utils");
const { UserInfo } = require("../models/model");
const auth = require("../middlewares/authentication");


// route.get("/:id", auth, async(req, res) => {
//   try {
//     const users = await UserInfo.findOne({_id: req.params.id});
//     return setResponse(res, null, users, 200);
//   } catch {
//     return setResponse(res, "Internal Server Error", null, 500);
//   }
// });

route.post("/login/", auth, async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await UserInfo.findOne({username, password});
    if (!users) {
      return setResponse(res, "username/password incorrect", null, 404);
    }
    return setResponse(res, "Login Successfull", users, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

  module.exports = route;