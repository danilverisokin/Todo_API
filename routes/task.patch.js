const router = require("express").Router();
const { errorsHandler } = require("../utils");
const { body, validationResult } = require("express-validator");
const { Task } = require("../models/index");

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

      const { id } = req.params;
      const { body } = req;

      await Task.update(
        { ...body },
        {
          where: {
            uuid: id,
          },
        }
      );

      res.send({ message: "ok" });
    } catch (e) {
      res.status(400).json("Error: " + e);
    }
  }
);

module.exports = router;
