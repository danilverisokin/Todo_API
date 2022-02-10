const router = require("express").Router();
const { errorsHandler } = require("../utils");
const { param, validationResult } = require("express-validator");
const { Task } = require("../models/index");

router.delete(
  "/:id",

  param("id").notEmpty().withMessage('param "id" is empty'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errorsHandler(errors) });
      }

      const { id } = req.params;

      await Task.destroy({
        where: {
          uuid: id,
        },
      });
      res.send({ message: "ок" });
    } catch (e) {
      res.status(400).json("Error: " + e);
    }
  }
);
module.exports = router;
