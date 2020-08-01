const express = require("express");
const router = express.Router();

//Help index Page
router.get("/", (req, res) => {
  res.render("help/index");
});

module.exports = router;
