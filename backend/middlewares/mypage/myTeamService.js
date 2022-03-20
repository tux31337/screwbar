const db = require('../../config/db/database.js');
const myTeamRepository = require('./myTeamRepository.js');

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
// 내가 만든 팀 삭제하기
async function deleteTeam(req, res) {
  // console.log(req.params.postNum);
  return db
    .execute('DELETE FROM posting WHERE postNum = ?', [req.params.postNum])
    .then((result) => {
      return res.json({ message: 'deleted' });
    });
}

/* 팀 평가 관련 */

// 평가 했는지 안 했는지
async function evaluated(req, res) {
  console.log(req.body);
  const user_id = req.body.user_id;
  const postNum = req.body.postNum;
  console.log(user_id);
  console.log(postNum);
  return db
    .execute(
      'SELECT evaluation FROM participants WHERE user_id = ? AND postNum = ?',
      [user_id, postNum]
    )
    .then((result) => {
      // console.log('평가했을까요?');
      return res.json({ result: result[0][0].evaluation });
    });
}
// 팀원 가져오기
async function getParticipants(req, res) {
  // console.log(req.body);
  const postNum = req.body.postNum;
  return db
    .execute(
      'SELECT users.user_id, users.username FROM participants INNER JOIN users ON users.user_id = participants.user_id WHERE postNum = ?',
      [postNum]
    )
    .then((result) => {
      return res.json({ result: result[0] });
    });
}

// 평가하기
async function doEvaluation(req, res) {
  console.log(req.body);
  const result = req.body.finalData;
  const user_id = req.body.user_id;
  const postNum = req.body.postNum;
  console.log(result);
  // 평가한 것을 각각 db에 넣어주기
  for (let personal of result) {
    await myTeamRepository.personalEvaluation(personal);
  }

  // db에 넣으면 평가완료처리하기
  return db
    .execute(
      'UPDATE participants SET evaluation = 1 WHERE user_id = ? AND postNum = ?',
      [user_id, postNum]
    )
    .then((result) => {
      return res.json({ message: '열정주기 완료' });
    });
}

// 열정온도 가져오기
async function getTemperature(req, res) {
  console.log('열정온도');
  console.log(req);
  const user_id = req.userId;
  console.log(user_id);
  return db
    .execute('SELECT * FROM temperature WHERE temperature.user_id = ?', [
      user_id,
    ])
    .then((result) => {
      console.log(result[0]);
      return res.status(200).json({ result: result[0] });
    });
}
module.exports.getMyTeam = getMyTeam;
module.exports.getDetailMyTeam = getDetailMyTeam;
module.exports.getParticipants = getParticipants;
module.exports.doEvaluation = doEvaluation;
module.exports.evaluated = evaluated;
module.exports.getTemperature = getTemperature;
module.exports.deleteTeam = deleteTeam;
