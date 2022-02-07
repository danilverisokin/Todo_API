const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const app = express();
const { PORT, mainUri } = require("./config");

app.use(cors());
app.options("*", cors());

// const func = async () => {
//   await db.Task.create({
//     name: "Dima",
//     done: true,
//     uuid: uuidv4(),
//   });

//   // console.log(tasks[0].dataValues);
// };

// func();

app.use(express.json());
app.use(mainUri, router);

app.listen(PORT, () => {
  console.log(`your server is ${PORT}`);
});
