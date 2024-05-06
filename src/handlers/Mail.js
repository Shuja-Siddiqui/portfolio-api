const Response = require("./Response");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

class Mail extends Response {
  addMail = async (req, res) => {
    try {
      const { senderName, from, message } = req.body;
      if (!from || !senderName || !message) {
        return this.sendResponse(req, res, {
          data: null,
          message: "All Fields are required",
          status: 400,
        });
      }

      await transporter.sendMail({
        from: `${senderName} <${process.env.USER_MAIL}>`,
        to: process.env.USER_MAIL,
        replyTo: from, // Set the reply-to address to the client's email address
        subject: "Portfolio",
        text: message,
      });
      // Find the developer

      this.sendResponse(req, res, {
        data: null,
        message: "Mail send Successfully",
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };
}
module.exports = { Mail };
