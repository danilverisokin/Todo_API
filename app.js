const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const app = express();
const { PORT, mainUri } = require("./config");
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("postgres", "postgres", "user", {
//   host: "localhost",
//   dialect: "postgres",
// });
// const func = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }

// };

// func();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(mainUri, router);

app.listen(PORT, () => {
  console.log(`your server is ${PORT}`);
});
