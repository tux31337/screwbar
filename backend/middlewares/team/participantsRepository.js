const db = require('../../config/db/database.js');

// 이미 참여자인 사람인지 판단
async function findJoin(postNum, user_id) {
  return db
    .execute('SELECT * FROM participants WHERE postNum= ? and user_id = ?', [
      postNum,
      user_id,
    ])
    .then((result) => result[0][0]);
}

// 인원수 가져오기
async function getHeadCount(postNum) {
  return db
    .execute('SELECT headCount FROM posting WHERE postNum = ?', [postNum])
    .then((result) => result[0][0].headCount);
}

// 인원수 업데이트
async function updateHeadCount(postNum, headCount) {
  return db
    .execute('UPDATE posting SET headCount = ? WHERE postNum = ?', [
      headCount,
      postNum,
    ])
    .then((result) => {
    });
}

// 추가
async function insertParticipant(postNum, user_id) {
  console.log(postNum)
  console.log(user_id);
  return db
    .execute('INSERT INTO participants(postNum, user_id, evaluation) VALUES(?,?,?)',
      [postNum, user_id, '0'])
    .then((result) => {
    })

}

// 유저와 작성자가 같은 사람인지 확인
async function isWriter(postNum, user_id) {
  return db.execute('SELECT * FROM posting WHERE postNum = ? and user_id = ?', [
    postNum,
    user_id,
  ])
  .then((result => {
    return result[0][0];
  }));
}

// 마감처리하기
async function closedTeam(postNum) {
  return db.execute('UPDATE posting SET closed = 1 WHERE postNum = ?', [
    postNum,
  ]);
}

module.exports.findJoin = findJoin;
module.exports.getHeadCount = getHeadCount;
module.exports.updateHeadCount = updateHeadCount;
module.exports.insertParticipant = insertParticipant;
module.exports.isWriter = isWriter;
module.exports.closedTeam = closedTeam;
