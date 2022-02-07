const router = require("express").Router();
const { filterAndSorter, errorsHandler } = require("../utils");
const { query, validationResult } = require("express-validator");

router.get(
  "/",
  query("filterBy")
    .isIn(["", "done", "undone", "all"])
    .withMessage(
      'query "filterBy" must be in array: ["all", "done", "undone"]'
    ),
  query("order")
    .isIn(["asc", "desc"])
    .withMessage('query "order" must be in array: ["asc", "desc"]'),
  query("page")
    .isInt({ min: 1 })
    .withMessage('query "page" must be greater then 0'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errorsHandler(errors) });
      }
      const {
        query: { filterBy, order, page },
      } = req;

      const result = await filterAndSorter(filterBy, order);

      if (result.count > 5) {
        result.tasks = [...result.tasks].splice((page - 1) * 5, 5);
      }

      res.send(result);
    } catch (e) {
      res.status(400).json("Error: " + e);
    }
  }
);

module.exports = router;
