const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require("express-validator");
const { User } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      if (!nameExists) {
        return res.status(400).send({ message: "No such user exists" });
      }

      //Проверка пароля
      const checkPassword = bcrypt.compareSync(
        body.password,
        nameExists.password
      );
      if (!checkPassword) {
        return res.status(400).send({ message: "Password mismatch" });
      }

      const token = jwt.sign({ userId: nameExists.userId }, "Aboba", {
        expiresIn: "1h",
      });

      res.send(token);
    } catch (e) {
      res.status(400).json("Error: " + e);
    }
  }
);

module.exports = router;
