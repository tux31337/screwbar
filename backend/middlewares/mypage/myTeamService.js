const db = require('../../config/db/database.js');
const fs = require('fs');

async function getMyTeam(req, res) {
  const user_id = req.userId;
  return db
    .execute(
      'SELECT posting.postNum, posting.user_id, posting.headCount, posting.meetingDate, posting.cost, posting.title, posting.contents, posting.postImg, posting.participants, posting.sportName, posting.areaName, posting.discloseInfo, posting.temperature, posting.deadline, posting.closed, users.email, users.username, users.birthday, users.phoneNumber, users.gender FROM (SELECT postNum FROM participants WHERE user_id = ?) AS myList INNER JOIN posting ON myList.postNum = posting.postNum inner join users on posting.user_id = users.user_id ',
      [user_id]
    )
    .then((result) => {
      return res.status(200).json({ message: result[0] });
    });
}

async function getDetailMyTeam(req, res) {
  return res.status(200);
}

module.exports.getMyTeam = getMyTeam;
module.exports.getDetailMyTeam = getDetailMyTeam;
