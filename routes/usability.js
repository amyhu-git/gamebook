const express = require("express");
const router = express.Router();
// const Participant = require("../models/participant");
const { get } = require("http");

//Start page
router.get("/", (req, res) => {
  res.render("usability/index");
});

module.exports = router;
