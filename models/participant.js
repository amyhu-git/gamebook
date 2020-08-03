const sql = require("./db.js");

//constructor
const Participant = function (participant) {
  this.participation_condition = participant.participation_condition;
  this.age_group = participant.age_group;
  this.gender = participant.gender;
  this.english_skills = participant.english_skills;
  this.language_skills = participant.language_skills;
  this.education = participant.education;
  this.date_time = new Date();
};

//Insert new participant data
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

//find participant by id
Participant.findById = (participantId, result) => {
  sql.query(
    `SELECT * FROM participants WHERE id=${participantId}`,
    (err, res) => {
      if (err) {
        console.log("error: , err");
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Getting participant: ", res[0]);
        result(null, res[0]);
        return;
      }

      //Not found Question with the id
      result({ kind: "not_found" }, null);
    }
  );
};

//delete participant
Participant.remove = (participant_id, result) => {
  sql.query(
    "DELETE FROM participants WHERE participant_id = ?",
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

      console.log("deleted participant with id ", id);
      result(null, res);
    }
  );
};

module.exports = Participant;
