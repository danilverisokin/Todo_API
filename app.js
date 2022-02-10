const express = require("express");
require("dotenv").config();
const cors = require("cors");
const recursive = require("recursive-readdir-sync");
const app = express();
const mainUri = "/api";

app.use(cors());
app.options("*", cors());

app.use(express.json());

recursive(`${__dirname}/routes`).forEach((file) =>
  app.use(mainUri, require(file))
);
// app.use(mainUri, router);

app.listen((PORT = process.env.PORT), () => {
  console.log(`your server is ${PORT}`);
});
