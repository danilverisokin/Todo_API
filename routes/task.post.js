const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../models/index");

const { errorsHandler } = require("../utils");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("done").optional().isBoolean().withMessage('body "done" is not boolean'),
  body("name")
    .optional()
    .isLength({ min: 1 })
    .withMessage('body "name" is too short'),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errorsHandler(errors) });
      }

      console.log(req);

      const { body } = req;

      const newTask = {
        uuid: uuidv4(),
        done: false,
        ...body,
      };

      await db.Task.create({
        ...newTask,
      });

      // const count = tasks.length;

      res.send({ message: "ok" });
    } catch (e) {
      res.status(400).json("Error: " + e);
    }
  }
);

module.exports = router;
