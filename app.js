const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const app = express();
const { PORT, mainUri } = require("./config");

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(mainUri, router);

app.listen(PORT, () => {
  console.log(`your server is ${PORT}`);
});
