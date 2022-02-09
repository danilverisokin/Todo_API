const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/router");
const app = express();
const mainUri = "/api";

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(mainUri, router);

app.listen((PORT = process.env.PORT), () => {
  console.log(`your server is ${PORT}`);
});
