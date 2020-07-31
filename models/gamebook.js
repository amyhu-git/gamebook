const sql = require("./db.js");

const Question = function(question) {
    this.id = question.id;
    this.scenario = question.scenario;
    this.letter = question.letter;
    this.question = question.question;
    this.choice1 = question.choice1;
    this.choice2 = question.choice2;
    this.choice3 = question.choice3;
    this.biased_answer = question.biased_answer;
    this.non_biased_answer = question.non_biased_answer;
    this.unrelated_answer = question.unrelated_answer;
    this.choice4 = question.choice4;
    this.biased_route = question.biased_route;
    this.nonbiased_route = question.nonbiased_route;
};

Question.getAll = (result) => {
    sql.query("SELECT * FROM questions", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("questions: ", res);
        result(null, res)
    })
};

Question.findById = (questionId, result) => {
    sql.query(`SELECT * FROM questions WHERE id=${questionId}`, (err, res) => {
        if(err) {
            console.log("error: , err");
            result(err, null);
            return;
        }

        if(res.length) {
            console.log("Getting question: ", res[0]);
            result(null, res[0]);
            return;
        }

        //Not found Question with the id
        result({kind: "not_found"}, null)
    });
};

module.exports = Question;