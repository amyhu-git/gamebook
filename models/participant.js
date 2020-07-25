const sql = require("./db.js");

// constructor
const Participant = function (participant) {
//   this.age_group = participant.age_group;
//   this.gender = participant.gender;
//   this.control = participant.control;
};

Participant.create = (newParticipant, result) => {
  sql.query("INSERT INTO participants SET ?", newParticipant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created Participant: ", {
      id: res.insertId,
      ...newParticipant,
    });
    result(null, { id: res.insertId, ...newParticipant });
  });
};

module.exports = Participant;
