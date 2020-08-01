const sql = require("./db.js");

const Answer = function(answer) {
    this.participant_id = answer.participant_id,
    this.question1 = answer.question1,
    this.question2 = answer.question2,
    this.question3 = answer.question3,
    this.question4 = answer.question4,
    this.question5 = answer.question5,
    this.question6 = answer.question6,
    this.question7 = answer.question7,
    this.question8 = answer.question8,
    this.question9 = answer.question9
};

Answer.insert = (newAnswer, result) => {
  sql.query(`INSERT INTO control_answers SET ?`, newAnswer, (err, res) => {
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

Answer.updateById = (participant_id, answer, result) => {
    sql.query(
        "UPDATE control_answers SET question1 = IFNULL(question1, ?), question2 = IFNULL(question2, ?), question3 = IFNULL(question3, ?), question4 = IFNULL(question4, ?), question5 = IFNULL(question5, ?), question6 = IFNULL(question6, ?), question7 = IFNULL(question7, ?), question8 = IFNULL(question8, ?), question9 = IFNULL(question9, ?) WHERE participant_id = ?",
        [answer.question1, answer.question2, answer.question3, answer.question4, answer.question5, answer.question6, answer.question7, answer.question8, answer.question9, participant_id],
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if(res.affectedRows = 0) {
                //not found participant with the id
                result({kind: "not_found"}, null);
                return; 
            }

            console.log("Updated Answers Participant: ", {participant_id: participant_id, ...answer});
            result(null, {participant_id: participant_id, ...answer})
        }
    );
};

Answer.remove = (participant_id, result) => {
  sql.query("DELETE FROM control_answers WHERE participant_id = ?", participant_id, (err, res) => {
    if(err) {
      console.log("error", err);
      result(null, err);
      return
    }

    if (res.affectedRows == 0) {
      //not found participant with id
      result({kind: "not_found"}, null);
      return;
    }

    console.log("deleted participant's answers with id ", id);
    result(null, res); 
  })
}

module.exports = Answer;
