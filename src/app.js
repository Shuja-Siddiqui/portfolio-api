require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const path = require("node:path");
const { router } = require("./routes");
const file = require("express-fileupload");
const nodemailer = require("nodemailer");
const { Settings } = require("./handlers");

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
  db.on("open", async () => {
    console.log("\x1b[32m", "[+] Database Connected");
    
    // Load API key from database on startup
    try {
      const apiKey = await Settings.getApiKey();
      if (apiKey) {
        console.log("\x1b[32m", "[+] Gemini API key loaded from database");
      } else {
        console.log("\x1b[33m", "[!] No Gemini API key found in database. Using environment variable or default.");
      }
    } catch (error) {
      console.log("\x1b[33m", "[!] Error loading API key:", error.message);
    }
    
    console.log("\x1b[32m", `[+] Server Started: http://localhost:${PORT}`);
  });
});

module.exports = { app };
