const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);
console.log(process.env.MONGO_URI);
module.exports = mongoose.connection;
