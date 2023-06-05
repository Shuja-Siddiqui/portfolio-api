const route = require("express").Router();
const { UserInfo } = require("../models/model");
const { setResponse } = require("../utils");
const jwt = require("jsonwebtoken");

route.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await UserInfo.findOne({ username });

    if (!existingUser) {
      return setResponse(res, "User not found", null, 404);
    }

    // const isPasswordValid = await bcrypt.compare(
    //   password,
    //   existingUser.password
    // );

    if (password !== existingUser.password) {
      return setResponse(res, "Invalid username/password", null, 401);
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET
    );
    return setResponse(
      res,
      "Login successful",
      { token: token, user_id: existingUser._id },
      200
    );
  } catch (error) {
    console.error(error);
    return setResponse(res, "Internal server error", null, 500);
  }
});

module.exports = route;
