const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { errorsHandler } = require("../utils");
const { body, validationResult } = require("express-validator");
const { User } = require("../models/index");

router.post(
  "/register",

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

      //Проверка существования имени в базе
      const nameExists = await User.findOne({
        where: { login: req.body.login },
      });
      if (nameExists) {
        return res.status(400).send({ message: "User with same name exists" });
      }

      //Хеширование пароля
      const hashPassword = await bcrypt.hash(body.password, 7);

      const newUser = {
        userId: uuidv4(),
        login: body.login,
        password: hashPassword,
      };
      await User.create({
        ...newUser,
      });

      res.send({ message: "ok" });
    } catch (e) {
      res.status(400).json("Error: " + e);
    }
  }
);

module.exports = router;
