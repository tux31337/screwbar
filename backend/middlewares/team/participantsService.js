const db = require('../../config/db/database.js');
const fs = require('fs');
const participantsRepository = require('./participantsRepository.js');

async function isParticipant(req, res) {
  const findJoin = await participantsRepository.findJoin(
    req.body.postNumId,
    req.userId
  );
  console.log(findJoin);
  if (findJoin) {
    res.status(200).json({ message: true });
  } else {
    res.status(200).json({ message: false });
  }
}

async function joinTeam(req, res) {
  console.log(req.body);
  const { postNum, user_id } = req.body;
  const findJoin = await participantsRepository.findJoin(postNum, user_id);
  const headCount = await participantsRepository.getHeadCount(postNum);
  if (findJoin) {
    await participantsRepository.updateHeadCount(postNum, headCount - 1);
    return db
      .execute('DELETE FROM participants WHERE postNum = ? and user_id = ?', [
        postNum,
        user_id,
      ])
      .then((result) => {
        console.log(result);
        return res.status(200).json({ message: '취소완료' });
      })
      .error((error) => {
        console.log(error);
      });
  } else {
    await participantsRepository.updateHeadCount(postNum, headCount + 1);
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
}

module.exports.joinTeam = joinTeam;
module.exports.isParticipant = isParticipant;
