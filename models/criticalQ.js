const sql = require("./db.js");

const CQuestion = function(question) {
    this.criticalQ_id = question.id
    this.question_id = question.question_id;
    this.cQuestion1 = question.cQuestion1;
    this.cQuestion2 = question.cQuestion2;
    this.cQuestion3 = question.cQuestion3;
    this.cQuestion4 = question.cQuestion4;
    this.decisionQuestion = question.decisionQuestion;
    this.choice1 = question.choice1;
    this.choice2 = question.choice2;
    this.choice3 = question.choice3;
    this.alternative1= question.alternative1;
    this.alternative2=question.alternative2;
    this.alternative3= question.alternative3;
};


CQuestion.findById = (questionId, result) => {
    sql.query(`SELECT * FROM criticalQ WHERE id=${questionId}`, (err, res) => {
        if(err) {
            console.log("error: , err");
            result(err, null);
            return;
        }

        if(res.length) {
            console.log("Getting question: ", res);
            result(null, res);
            return;
        }

        //Not found Question with the id
        result({kind: "not_found"}, null)
    });
};

module.exports = CQuestion;