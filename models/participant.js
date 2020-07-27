const sql = require("./db.js");

const Participant = function(participant) {
    this.participation_condition = participant.participation_condition;
    this.age_group = participant.age_group;
    this.gender = participant.gender;
    this.date_time = new Date();
};

Participant.insert = (newParticipant, result) => {
  sql.query(`INSERT INTO participants SET ?`, newParticipant, (err, res) => {
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
