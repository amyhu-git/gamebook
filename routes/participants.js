const express = require('express')
const router = express.Router()
const Participant = require('../models/participant')

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
//     Participant.create(participant, (err, data) => {
//       if (err)
//         res.status(500).send({
//           message: err.message || "Some error occurred while creating the User.",
//         });
//       else res.send(data);
//     });
//   };

//All participants route
router.get('/', (req, res) => {
    res.render('participants/index')
});

// //New participant route
// router.get('/new', (req, res) => {
//     res.render('participants/new', {participant: new Participant() })
// })

//Create new user
router.get('/new', (req, res) => {
    res.render('participants/new', { participant: new Participant() })
});

//Create Participant Route
router.post('/', (req, res) => {
    // res.send(req.body.age_group);
    let info = new Object
    info.age_group = req.body.age_group
    info.gender = req.body.gender
    res.send(`I am in age group ${info.age_group} and ${info.gender}`)
})

module.exports = router