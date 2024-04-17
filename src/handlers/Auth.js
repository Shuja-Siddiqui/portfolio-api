const { DashboardUserModel } = require("../model");
const Response = require("./Response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class Auth extends Response {
  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Username or Password is required",
        });
      }
      let userExist;
      userExist = await DashboardUserModel.findOne({
        $or: [{ username: username }, { email: username }],
      });
      if (!userExist) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Invalid Username/Password",
        });
      }
      // check the password
      const password0 = userExist?.password;
      const isValid = await bcrypt.compare(password0, password);
      if (isValid) {
        return this.sendResponse(req, res, {
          status: 405,
          message: "Username/Password not correct",
        });
      }
      // Generate JWT token
      const token = jwt.sign({ id: userExist?.devId }, process.env.JWT_SECRET);
      return this.sendResponse(req, res, {
        data: { token, userExist },
        message: "Login Successful",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  signup = async (req, res) => {
    try {
      const { name, username, password, email } = req.body;
      if (!name || !username || !password || !email) {
        return this.sendResponse(req, res, {
          data: null,
          status: 405,
          message: "All Fields are required",
        });
      }
      let userExist = await DashboardUserModel.findOne({ email });
      if (userExist) {
        return this.sendResponse(req, res, {
          status: 423,
          message: "User already exists",
        });
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      userExist = new DashboardUserModel({
        name,
        username,
        password: hashedPassword,
        email,
      });
      await userExist.save();

      // Generate JWT token
      const token = jwt.sign(
        { email: userExist.email },
        { id: userExist?._id },
        process.env.JWT_SECRET
      );

      // Send the token in the response
      return this.sendResponse(req, res, {
        status: 200,
        message: "User created successfully",
        token: token,
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };
}
module.exports = { Auth };
