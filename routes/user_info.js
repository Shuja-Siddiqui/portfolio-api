const route = require("express").Router();
const { setResponse } = require("../utils");
const { UserInfo } = require("../models/model");
const auth = require("../middlewares/authentication");

route.get("/:id", auth, async (req, res) => {
  try {
    const users = await UserInfo.findOne({ _id: req.params.id });
    return setResponse(res, null, users, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.patch("/:id", auth, async (req, res) => {
  const { new_username, username, password, new_password } = req.body;
  console.log("Body for user update", req.body);
  try {
    const user = await UserInfo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        new_username,
        new_password,
      },
      { new: true }
    );
    return setResponse(res, "Updated", user, 200);
  } catch (error) {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/login", async (req, res) => {
  res.send("Logging in");
  // try {
  //   const { username, password } = req.body;
  //   const users = await UserInfo.findOne({ username, password });
  //   if (!users) {
  //     return setResponse(res, "username/password incorrect", null, 404);
  //   }
  //   return setResponse(res, "Login Successfull", users, 200);
  // } catch {
  //   return setResponse(res, "Internal Server Error", null, 500);
  // }
});

module.exports = route;
