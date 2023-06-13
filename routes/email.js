const route = require("express").Router();
const nodemailer = require("nodemailer");
const { Settings } = require("../models/model");

route.post("/", async (req, res) => {
  try {
    const recieverEmail = await Settings.find({});
    console.log(recieverEmail[0].email);
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
      to: recieverEmail[0].email,
      subject: `New message from ${name}`,
      text: message,
    });

    res.status(200).send("Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

module.exports = route;
