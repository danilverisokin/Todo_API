const express = require("express");
const router = express.Router();

router.use("/", require("./get.routes"));
router.use("/", require("./patch.routes"));
router.use("/", require("./post.routes"));
router.use("/", require("./del.routes"));

module.exports = router;
