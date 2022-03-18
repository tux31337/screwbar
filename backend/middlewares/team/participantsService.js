const db = require('../../config/db/database.js');
const fs = require('fs');
const participantsRepository = require('./participantsRepository.js');

async function isParticipant(req, res) {
  const findJoin = await participantsRepository.findJoin(
    req.body.postNumId,
    req.userId
  );
  if (findJoin) {
    res.status(200).json({ message: true });
  } else {
    res.status(200).json({ message: false });
  }
}

async function joinTeam(req, res) {
  const { postNum} = req.body;
  const user_id = req.userId
  const findJoin = await participantsRepository.findJoin(postNum, user_id);
  const headCount = await participantsRepository.getHeadCount(postNum);
  const isWriter = await participantsRepository.isWriter(postNum, user_id);
  console.log(isWriter);
  if (isWriter) {
    const isClosed = await participantsRepository.closedTeam(postNum);
    if (isClosed) {
      return res.status(200).json({ message: '마감완료' });
    }
  }
  else if (findJoin) {
    await participantsRepository.updateHeadCount(postNum, headCount - 1);
    return db
      .execute('DELETE FROM participants WHERE postNum = ? and user_id = ?', [
        postNum,
        user_id,
      ])
      .then((result) => {
        return res.status(200).json({ message: '취소완료' });
      })
  } else {
    await participantsRepository.updateHeadCount(postNum, headCount + 1);
    return db
      .execute(
        'INSERT INTO participants(postNum, user_id, evaluation) VALUES(?,?,?)',
        [postNum, user_id, '0']
      )
      .then((result) => {
        return res.status(200).json({ message: '신청완료' });
      })
  }
}

module.exports.joinTeam = joinTeam;
module.exports.isParticipant = isParticipant;
