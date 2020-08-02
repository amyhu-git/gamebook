const sql = require("./db.js");

//constructor
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

module.exports = Usability;
