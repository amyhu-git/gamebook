const sql = require("./db.js");

//constructor
const CriticalAnswer = function (answer) {
  this.participant_id = answer.participant_id;
  this.question_id = answer.question_id;
  this.cQuestion1 = answer.cQuestion1;
  this.cQuestion2 = answer.cQuestion2;
  this.cQuestion3 = answer.cQuestion3;
  this.cQuestion4 = answer.cQuestion4;
  this.decisionQuestion = answer.decisionQuestion;
};

//create new answer for participant
CriticalAnswer.insert = (newAnswer, result) => {
  sql.query(`INSERT INTO critical_answers SET ?`, newAnswer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created Answers for Participant: ", {
      ...newAnswer,
    });
    result(null, { ...newAnswer });
  });
};

//update answer based on participant id
CriticalAnswer.updateById = (participant_id, question_id, answer, result) => {
  sql.query(
    "UPDATE critical_answers SET cQuestion1 = IFNULL(cQuestion1, ?), cQuestion2 = IFNULL(cQuestion2, ?), cQuestion3 = IFNULL(cQuestion3, ?), cQuestion4 = IFNULL(cQuestion4, ?), decisionQuestion = IFNULL(decisionQuestion, ?) WHERE participant_id = ? AND question_id = ?",
    [
      answer.cQestion1,
      answer.cQestion2,
      answer.cQestion3,
      answer.cQestion4,
      answer.decisionQuestion,
      participant_id,
      question_id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if ((res.affectedRows = 0)) {
        //not found participant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated Answers Participant: ", {
        participant_id: participant_id,
        question_id: question_id,
        ...answer,
      });
      result(null, {
        participant_id: participant_id,
        question_id: question_id,
        ...answer,
      });
    }
  );
};

//delete answers with participant id
CriticalAnswer.remove = (participant_id, result) => {
  sql.query(
    "DELETE FROM critical_answers WHERE participant_id = ?",
    participant_id,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        //not found participant with id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted participant's answers with id ", id);
      result(null, res);
    }
  );
};

//delete answers with participant id
CriticalAnswer.remove = (participant_id, result) => {
  sql.query(
    "DELETE FROM critical_answers WHERE participant_id = ?",
    participant_id,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        //not found participant with id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted participant's answers with id ", id);
      result(null, res);
    }
  );
};

module.exports = CriticalAnswer;
