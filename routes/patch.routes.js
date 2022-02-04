const router = require("express").Router();
const { openAndRemake, remakeAndSave, errorsHandler } = require("../utils");
const { body, validationResult } = require("express-validator");

router.patch(
  "/:id",
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

      const {
        params: { id },
        body,
      } = req;

      let tasks = openAndRemake();

      tasks = tasks.map((item) => {
        if (item.uuid === id)
          item = {
            ...item,
            ...body,
          };
        return item;
      });

      remakeAndSave(tasks);

      const count = tasks.length;

      res.send({ count: count, tasks: tasks });
    } catch (e) {
      res.status(400).json("Error: " + e);
    }
  }
);

module.exports = router;
