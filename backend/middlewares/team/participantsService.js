const db = require('../../config/db/database.js');
const fs = require('fs');
const participantsRepository = require('./participantsRepository.js');
async function joinTeam(req, res) {
  console.log(req.body);
  const { postNum, user_id } = req.body;
  const findJoin = await participantsRepository.findJoin(postNum, user_id);
  console.log(findJoin);
  if (findJoin) {
    return res.status(409).json({ message: '이미 신청하셨습니다.' });
  }
  return db
    .execute(
      'INSERT INTO participants(postNum, user_id, evaluation) VALUES(?,?,?)',
      [postNum, user_id, '0']
    )
    .then((result) => {
      console.log(result);
      return res.status(200).json({ message: '신청완료' });
    })
    .error((error) => {
      console.log(error);
    });
}

module.exports.joinTeam = joinTeam;
