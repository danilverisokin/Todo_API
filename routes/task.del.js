const router = require("express").Router();
const { openAndRemake, remakeAndSave, errorsHandler } = require("../utils");
const { param, validationResult } = require("express-validator");

router.delete(
  "/:id",
  param("id").notEmpty().withMessage('param "id" is empty'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errorsHandler(errors) });
      }

      const {
        params: { id },
      } = req;

      let tasks = openAndRemake();

      tasks = tasks.filter((item) => item.uuid !== id);

      remakeAndSave(tasks);

      res.send({ message: "ок" });
    } catch (e) {
      res.status(400).json("Error: " + e);
    }
  }
);

module.exports = router;
