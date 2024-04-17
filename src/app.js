require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const path = require("node:path");
const { router } = require("./routes");
const file = require("express-fileupload");

app.use(express.json());


app.use(cors());

const PORT = process.env.PORT || 5000;


// Middlewares

app.use(file());
app.use(express.static(path.join(__dirname, "../public")));

// Routes

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// Mounting router
app.use("/api/v1", router);
app.listen(PORT, () => {
  console.log("\x1b[33m%s\x1b[0m", "[!] Connection to database...");
  db.on("error", (err) => {
    console.error(err);
  });

  //   DATABASE OPEN
  db.on("open", () => {
    console.log("\x1b[32m", "[+] Database Connected");
    console.log("\x1b[32m", `[+] Server Started: http://localhost:${PORT}`);
  });
});

module.exports = { app };
