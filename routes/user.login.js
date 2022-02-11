const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require("express-validator");
const { User } = require("../models/index");
const bcrypt = require("bcryptjs");

router.post(
  "/login",

  body("login")
    .optional()
    .isLength({ min: 1 })
    .withMessage('body "password" is too short'),
  body("password")
    .optional()
    .isLength({ min: 1 })
    .withMessage('body "password" is too short'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errorsHandler(errors) });
      }

      const { body } = req;

      //Проверка существавания логина в базе
      const nameExists = await User.findOne({
        where: { login: req.body.login },
      });
      console.log("Login >>>", nameExists);
      if (!nameExists) {
        return res.status(400).send({ message: "No such user exists" });
      }

      //Хеширование пароля для проверки
      const hashPassword = await bcrypt.hash(body.password, 7);

      const newTask = {
        userId: uuidv4(),
        ...body,
      };
      await User.create({
        ...newTask,
      });

      res.send({ message: "ok" });
    } catch (e) {
      res.status(400).json("Error: " + e);
    }
  }
);

module.exports = router;
