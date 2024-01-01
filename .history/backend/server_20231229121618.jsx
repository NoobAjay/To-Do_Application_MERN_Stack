const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on port  ${PORT}`.yellow.bold));

//heello
