const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server Started: http://localhost:${PORT}`);
});
