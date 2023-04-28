const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes/index");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Successful");
});

app.use(route);

app.listen(PORT, () => {
  console.log(`Server Started: http://localhost:${PORT}`);
});


// mongodb+srv://ShujaUrRehman:<password>@portfolio.s7bz7a9.mongodb.net/?retryWrites=true&w=majority