const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require("express-validator");
const { User } = require("../models/index");

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
