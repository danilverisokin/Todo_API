const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../models/index");

const { errorsHandler } = require("../utils");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
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

      const newUser = {
        userId: uuidv4(),
        ...body,
      };

      await db.User.create({
        ...newUser,
      });

      res.send({ message: "ok" });
    } catch (e) {
      res.status(400).json("Error: " + e);
    }
  }
);

module.exports = router;
