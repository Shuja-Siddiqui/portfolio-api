const path = require("node:path");
const file = require("express-fileupload");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const db = require("./db");
const { router } = require("./routes");
const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares

app.use(express.json());
const corsOptions = {
  origin: 'https://portfolio-dash-board.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));
app.use(file());

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
