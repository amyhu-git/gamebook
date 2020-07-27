const sql = require("./db.js");

const Participant = function(participant) {
    this.participation_number = participant.participation_number;
    this.age_group = participant.age_group;
    this.gender = participant.gender;
};

Participant.insert = (newParticipant, result) => {
  sql.query(`INSERT INTO players SET ?`, newParticipant, (err, res) => {
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
