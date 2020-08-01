const express = require("express");
const router = express.Router();
const Participant = require("../models/participant");
const Question = require("../models/gamebook");
const CQuestion = require("../models/criticalQ");
const Answer = require("../models/answer");
const { get } = require("http");
const { isBuffer } = require("util");

let participant_id;
let question_id;
let biased_answer;
let biased_route;
let nonbiased_route;

//Participation info sheet route
router.get("/", (req, res) => {
  res.render("gamebook/index");
});

//Demographic info route
router.get("/part1", (req, res) => {
  res.render("gamebook/part1");
  //   res.render("participants/new");
});

//error route
router.get("/error", (req, res) => {
  res.render("gamebook/error");
});

//create new participant route
router.post("/", (req, res) => {
  let participation_condition = req.body.participation_condition;
  let condition = participation_condition.charAt(0);
  let message = "Error. Invalid Participation Number!";

  const participant = new Participant({
    participation_condition: condition,
    age_group: req.body.age_group,
    gender: req.body.gender,
    date_time: new Date(),
    // question1: req.body.question1,
  });

  if (condition === "0" || condition === "1") {
    Participant.insert(participant, (err, data) => {
      participant_id = data.id;
      if (err)
        res.status(500).send({
          message:
            err.message || "Something occurred while creating the Participant.",
        });
      else {
        if (condition === "0") {
          res.render(`gamebook/part2`, {
            participant_id: data.id,
          });
        } else if (condition === "1") {
          res.render("gamebook/partB", {
            participant_id: data.id,
          });
        }
      }
    });
  } else {
    res.render("gamebook/error", {
      message: message,
    });
  }
});

//get all questions
// router.get("/allQuestions", (req, res) => {
//   Question.getAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Questions.",
//       });
//     else {
//       res.send(data);
//     }
//   });
// });

router.get("/part2", (req, res) => {
  res.render("gamebook/part2");
});

router.get(`/scenario/:questionId`, (req, res) => {
  Question.findById(req.params.questionId, (err, data) => {
    question_id = data.id;
    biased_answer = data.biased_answer;
    biased_route = data.biased_route;
    nonbiased_route = data.nonbiased_route;

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Question with id ${req.params.questionId}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Question with id " + req.params.questionId,
        });
      }
    } else
      res.render("gamebook/scenario", {
        participant_id: participant_id,
        question_id: data.id,
        scenario: data.scenario,
        letter: data.letter,
        question: data.question,
        choice1: data.choice1,
        choice2: data.choice2,
        choice3: data.choice3,
        choice4: data.choice4,
        biased_answer: data.biased_answer,
        biased_route: data.biased_route,
        nonbiased_route: data.nonbiased_route,
      });
  });
});

router.get("/partB", (req, res) => {
  res.render("gamebook/partB");
});

//create new participant route
router.post("/scenario", (req, res) => {
  const answer = new Answer({
    participant_id: participant_id,
    question1: req.body.answer1,
    question2: req.body.answer2,
    question3: req.body.answer3,
    question4: req.body.answer4,
    question5: req.body.answer5,
    question6: req.body.answer6,
    question7: req.body.answer7,
    question8: req.body.answer8,
    question9: req.body.answer9,
  });

  console.log(question_id);
  console.log("Biased answer" + biased_answer);

  Answer.insert(answer, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Something occurred while creating the Answer.",
      });
    else {
      console.log(answer.question1 == biased_answer);
      if (answer.question1 == biased_answer) {
        res.redirect(`./scenario/${biased_route}`);
      } else {
        res.redirect(`./scenario/${nonbiased_route}`);
      }
    }
  });
});

//get single participant
router.get("/edit/:participantId", (req, res) => {
  Participant.findById(req.params.participantId, (err, data) => {
    if (err) {
      if (err.kind === "not found") {
        res.status(404).send({
          message: `Not found participant with id ${req.params.participantId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving participant with id" + req.params.participantId,
        });
      }
    } else res.send(JSON.stringify(data));
  });
});

//Update participant's answer with participant_id
router.post(`/scenario/:participantId`, (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const answer = new Answer({
    participant_id: participant_id,
    question2: req.body.answer2,
    question3: req.body.answer3,
    question4: req.body.answer4,
    question5: req.body.answer5,
    question6: req.body.answer6,
    question7: req.body.answer7,
    question8: req.body.answer8,
    question9: req.body.answer9,
  });

  console.log(participant_id);
  console.log(Object.keys(req.body));
  console.log(req.body.answer7)

  Answer.updateById(parseInt(req.params.participantId), answer, (err, data) => {
    // console.log(data);
    let array = Object.values(answer);
    let value = array.find((e) => e !== undefined);
    // console.log(value);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found participant with id ${req.params.participant_id}`,
        });
      } else {
        res.status(500).send({
          message:
            "Error updating Participant with Id" + req.params.participant_id,
        });
      }
    } else if (isNaN(value)) {
      res.redirect(`./${nonbiased_route}`);
    } else if (question_id == 9) {
      res.redirect(`/usability`);
    } else {
      // console.log(Object.keys(answer))
      // console.log(Object.values(answer))
      if (value == biased_answer) {
        res.redirect(`./${biased_route}`);
      } else {
        res.redirect(`./${nonbiased_route}`);
      }
    }
  });
});

// Participant.updateById(
//   req.params.participantId,
//   new Participant(req.body),
//   (err, data) => {
//     console.log(data);
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found User with id ${req.params.participantId}`,
//         });
//       } else {
//         res.status(500).send({
//           message: "Error updating User with id " + req.params.participantId,
//         });
//       }
//     }
//   }
// );

// router.get(`/add/:questionId`, (req, res) => {
//   Question.findById(req.params.questionId, (err, data) => {
//     question_id = data.id;
//     biased_answer = data.biased_answer;
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Question with id ${req.params.questionId}`,
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Question with id " + req.params.questionId,
//         });
//       }
//     } else
//       res.render("gamebook/add", {
//         participant_id: participant_id,
//         question_id: data.id,
//         scenario: data.scenario,
//         letter: data.letter,
//         question: data.question,
//         choice1: data.choice1,
//         choice2: data.choice2,
//         choice3: data.choice3,
//         choice4: data.choice4,
//         biased_answer: data.biased_answer,
//       });
//   });
// });

router.get(`/cScenario/:cquestionId`, (req, res) => {
  CQuestion.findById(req.params.cquestionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Question with id ${req.params.cquestionId}`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Question with id " + req.params.cquestionId,
        });
      }
    } else
      res.render("gamebook/cScenario", {
        criticalQ_id: data.id,
        cQuestion1: data.cQuestion1,
        cQuestion2: data.cQuestion2,
        cQuestion3: data.cQuestion3,
        cQuestion4: data.cQuestion4,
        decisionQuestion: data.decisionQuestion,
        choice1: data.choice1,
        choice2: data.choice2,
        choice3: data.choice3,
        alternative1: data.alternative1,
        alternative2: data.alternative2,
        alternative3: data.alternative3,
      });
  });
});

// router.get("/cScenario/:questionId", (req, res) => {
//   //   Question.findById(req.params.questionId, (err, data) => {
//   //     if (err) {
//   //       if (err.kind === "not_found") {
//   //         res.status(404).send({
//   //           message: `Not found Question with id ${req.params.questionId}`,
//   //         });
//   //       } else {
//   //         res.status(500).send({
//   //           message: "Error retrieving Question with id " + req.params.questionId,
//   //         });
//   //       }
//   //     } else
//   //       res.render("gamebook/cScenario", {
//   //         scenario: data.scenario,
//   //         letter: data.letter,
//   //         question: data.question,
//   //         choice1: data.choice1,
//   //         choice2: data.choice2,
//   //         choice3: data.choice3,
//   //         choice4: data.choice4,
//   //         biased_answer: data.biased_answer,
//   //       });
//   //   });

//   CQuestion.findById(req.params.questionId, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Question with id ${req.params.questionId}`,
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Question with id " + req.params.questionId,
//         });
//       }
//     } else {
//       res.render("gamebook/cScenario", {
//         cquestion_id: data.id,
//         question1: data.cQuestion1,
//         question2: data.cQuestion2,
//         question3: data.cQuestion3,
//         question4: data.cQuestion4,
//         decisionQuestion: data.decisionQuestion,
//         cq_choice1: data.choice1,
//         cq_choice2: data.choice2,
//         cq_choice3: data.choic3,
//         alternative1: data.alternative1,
//         alternative2: data.alternative2,
//         alternative3: data.alternative3,
//       });
//     }
//     // res.send(data)
//   });
// });

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
