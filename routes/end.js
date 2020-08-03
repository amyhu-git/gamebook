const express = require("express");
const router = express.Router();
const { get } = require("http");

//Start page
router.get("/", (req, res) => {
  res.render("end/index");
});

module.exports = router;
