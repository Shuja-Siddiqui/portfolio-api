const route = require("express").Router();
const { setResponse } = require("../utils");
const data = require("./data");


route.get("/:id", (req, res) => {
  try {
    return setResponse(res, null, data[parseInt(req.params.id)], 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

route.post("/login/", (req, res) => {
  try {
    const { username, password } = req.body;
    let userFound = false;
    let userIndex = -1;
    data.map((item, index) => {
      if (
        item.user_info.username === username &&
        item.user_info.password == password
      ) {
        userFound = true;
        userIndex = index;
      }
    });
    if (!userFound) {
      return setResponse(res, "username/password incorrect", null, 404);
    }

    return setResponse(res, "Login Successfull", data[userIndex], 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

  module.exports = route;