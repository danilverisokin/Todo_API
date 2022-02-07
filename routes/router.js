const express = require("express");
const router = express.Router();

router.use("/", require("./task.get"));
router.use("/", require("./task.patch"));
router.use("/", require("./task.post"));
router.use("/", require("./task.del"));

module.exports = router;
