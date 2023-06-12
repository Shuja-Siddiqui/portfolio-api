const route = require("express").Router();
const nodemailer = require("nodemailer");

route.post("/", async (req, res) => {
  console.log("req body", req.body);
  try {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
      host: "mail.consoledot.com",
      port: 465,
      secure: true,
      auth: {
        user: "noreply@consoledot.com",
        pass: "QWerTY@#$2",
      },
    });

    const info = await transporter.sendMail({
      from: email,
      to: "umarwork1663@gmail.com",
      subject: `New message from ${name}`,
      text: message,
    });

    console.log("Email sent:", info.messageId);
    res.status(200).send("Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

module.exports = route;
