const express = require("express");
const router = express.Router();
const Usability = require("../models/usability");
const { get } = require("http");

//Start page
router.get("/", (req, res) => {
  res.render("usability/index");
});

// //create new participant route
// router.post("/", (req, res) => {
//   const user = new Usability({
//     usability1: req.body.usability1,
//     usability2: req.body.usability2,
//     usability3: req.body.usability3,
//     usability4: req.body.usability4,
//     usability5: req.body.usability5,
//     usability6: req.body.usability6,
//   });

//   Usability.insert(user, (err, data) => {
//     if (err) {
//       res.status(500).send({
//         message:
//           err.message || "Something occurred while creating the Participant.",
//       });
//     } else {
//       res.send(data);
//     }
//   });
// });

module.exports = router;
