const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const { openAndRemake, remakeAndSave, errorsHandler } = require("../utils");
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

      const { body } = req;

      const newTask = {
        uuid: uuidv4(),
        ...body,
        createdAt: new Date(),
      };

      let tasks = openAndRemake();
      tasks.unshift(newTask);
      remakeAndSave(tasks);

      const count = tasks.length;

      res.send({ count, tasks });
    } catch (e) {
      res.status(400).json("Error: " + e);
    }
  }
);

module.exports = router;
