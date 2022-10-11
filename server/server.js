const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig");

// listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
