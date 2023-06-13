const route = require("express").Router();
const auth = require("../middlewares/authentication");
const { Settings } = require("../models/model");
const { setResponse } = require("../utils");

route.patch("/", auth, async (req, res) => {
  const { current_email, new_email } = req.body;
  try {
    const email = await Settings.findOneAndUpdate(
      { email: current_email },
      { $set: { email: new_email } },
      { new: true }
    );
    if(!email){
    return setResponse(res, "Not found", email, 404);

    }
    return setResponse(res, "Updated", email, 200);
  } catch (error) {
    setResponse(res, "Internal Server Error", null, 500);
  }
});

module.exports = route;
