const express = require("express");
const router = express.Router();
const Participant = require("../models/participant");
const Question = require("../models/gamebook");
const { get } = require("http");
const { isBuffer } = require("util");

//Participation info sheet route
router.get("/", (req, res) => {
  res.render("gamebook/index");
});

// //New participant route
// router.get('/new', (req, res) => {
//     res.render('participants/new', {participant: new Participant() })
// })

//new user route
router.get("/part1", (req, res) => {
  res.render("gamebook/part1");
  //   res.render("participants/new");
});

router.get("/part2", (req, res) => {
  res.render("gamebook/part2");
});

//create new user route
router.post("/", (req, res) => {
  let participation_condition = req.body.participation_condition;
  let condition = participation_condition.charAt(0);
  console.log(typeof condition);

  const participant = new Participant({
    participation_condition: condition,
    age_group: req.body.age_group,
    gender: req.body.gender,
    date_time: new Date(),
  });

  Participant.insert(participant, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some occurred while creating the Participant.",
      });
    else {
      if (condition === "0") {
        res.redirect("gamebook/part2");
      } else if (condition === "1") {
        res.redirect("gamebook/partB");
      }
    }
  });
});

router.get("/allQuestions", (req, res) => {
  Question.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Questions.",
      });
    else {
      res.send(data);
      // console.log(data);
    }
  });
});

router.get("/part2", (req, res) => {
    res.render("gamebook/part2")
})

router.get("/scenario/:questionId", (req, res) => {
  Question.findById(req.params.questionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Question with id ${req.params.questionId}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Question with id " + req.params.userId,
        });
      }
    } else
      res.render("gamebook/scenario", {
        scenario: data.scenario,
        letter: data.letter,
        question: data.question,
        choice1: data.choice1,
        choice2: data.choice2,
        choice3: data.choice3,
        choice4: data.choice4,
        biased_answer: data.biased_answer,
      });
  });
});

module.exports = router;

//Create Participant Route
// router.get("/continue", (req, res) => {
//   //   participant = { age_group: `${req.body.age_group}`, gender: `${req.body.gender}`, control:`${req.body.control}` };
//   //   let sql = "INSERT INTO participants SET ?"; //? placeholder
//   //   db.query(sql, participant, (err, result) => {
//   //     if (err) throw err;
//   //     console.log(result);
//   //     res.send("participant added...");
//   //   }); //post fills placeholder
//   //   db.query("SELECT * from players", (err, rows, fields) => {
//   //     if (!err) {
//   //       res.send(rows);
//   //     } else {
//   //       console.log(err);
//   //     }
//   //   });
//   res.render("participants/continue");
// });

// router.post("/new" , (req, res) => {
//      // Validate request
//      if (!req.body) {
//         res.status(400).send({
//           message: "Content can not be empty!",
//         });
//       }

//       // Create a User
//       const participant = new Participant({
//         age_group: req.body.age_group,
//         gender: req.body.gender,
//         condition: req.body.condition,
//       });

//       console.log(participant)

//       // Save User in the database
//       Participant.create(participant, (err, data) => {
//         if (err)
//           res.status(500).send({
//             message: err.message || "Some error occurred while creating the User.",
//           });
//         else res.send(data);
//       });
// })

// res.send(req.body.age_group);
//   let info = new Object();
//   info.age_group = req.body.age_group;
//   info.gender = req.body.gender;
//   info.control = true;

//   // const participant = new Participant({
//   //     age_group: req.body.age_group,
//   //     gender: req.body.gender
//   // })

//   console.log(info);

//   // participant.save((err, newParticipant) => {
//   //     if(err){
//   //         res.render('participants/new', {
//   //             participant: participant,
//   //             errorMessage: 'Error creating Participant'
//   //         })
//   //     } else {
//   //         // res.redirect(`participants/${newParticipant.id}`)
//   //        res.redirect(`participants`)
//   //     }
//   // })

//   // Create a User
//   const participant = new Participant({
//     age_group: req.body.age_group,
//     gender: req.body.gender,
//     control: req.body.control,
//   });

//   // Save User in the database
//   Participant.create(participant, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message: err.message || "Some error occurred while creating the User.",
//       });
//     else res.send(data);
//   });
//   res.send(`I am in age group ${info.age_group} and ${info.gender}`);
