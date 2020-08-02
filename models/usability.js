const sql = require("./db.js");

const Usability = function (user) {
  this.participant_id = user.participant_id;
  this.usability1 = user.usability1;
  this.usability2 = user.usability2;
  this.usability3 = user.usability3;
  this.usability4 = user.usability4;
  this.usability5 = user.usability5;
  this.usability6 = user.usability6;
  this.comment = user.comment;
};

//Insert new participant data
Usability.insert = (newUser, result) => {
  sql.query(`INSERT INTO usability SET ?`, newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created Usability Answers: ", {
      ...newUser,
    });
    result(null, { ...newUser });
  });
};

// Answer.updateById = (participant_id, answer, result) => {
//   sql.query(
//     "UPDATE control_answers SET question1 = IFNULL(question1, ?), question2 = IFNULL(question2, ?), question3 = IFNULL(question3, ?), question4 = IFNULL(question4, ?), question5 = IFNULL(question5, ?), question6 = IFNULL(question6, ?), question7 = IFNULL(question7, ?), question8 = IFNULL(question8, ?), question9 = IFNULL(question9, ?) WHERE participant_id = ?",
//     [
//       answer.question1,
//       answer.question2,
//       answer.question3,
//       answer.question4,
//       answer.question5,
//       answer.question6,
//       answer.question7,
//       answer.question8,
//       answer.question9,
//       participant_id,
//     ],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if ((res.affectedRows = 0)) {
//         //not found participant with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("Updated Answers Participant: ", {
//         participant_id: participant_id,
//         ...answer,
//       });
//       result(null, { participant_id: participant_id, ...answer });
//     }
//   );
// };

module.exports = Usability;
