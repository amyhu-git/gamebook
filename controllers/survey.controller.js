// const Participant = require("../models/participant.js");

// // Create and Save a new User
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body) {
//       res.status(400).send({
//         message: "Content can not be empty!",
//       });
//     }
  
//     // Create a User
//     const participant = new Participant({
//       age_group: req.body.age_group,
//       gender: req.body.gender,
//       control: req.body.control,
//     });
  
//     // Save User in the database
//     participant.create(user, (err, data) => {
//       if (err)
//         res.status(500).send({
//           message: err.message || "Some error occurred while creating the Participant.",
//         });
//       else res.send(data);
//     });
//   };
