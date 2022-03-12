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
      console.log(result);
    });
}

module.exports.findJoin = findJoin;
module.exports.getHeadCount = getHeadCount;
module.exports.updateHeadCount = updateHeadCount;
