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
  try {
    const user = await UserInfo.findById({ _id: req.params.id });
    if (username && user.username !== username) {
      return setResponse(res, "Not found", null, 404);
    }
    if (password && user.password === password) {
      return setResponse(res, "Not found", null, 404);
    }

    user.username = username;
    user.password = password;
    // const updatedUser = await UserInfo.findByIdAndUpdate(
    //   { _id: req.params.id },
    //   {
    //     new_username,
    //     new_password,
    //   },
    //   { new: true }
    // );
    return setResponse(res, "Updated", updatedUser, 200);
  } catch (error) {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.get("/login", async (req, res) => {
  res.send("Logging in");
});

module.exports = route;
