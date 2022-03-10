const db = require('../../config/db/database.js');

async function findJoin(postNum, user_id) {
  return db
    .execute('SELECT * FROM participants WHERE postNum= ? and user_id = ?', [
      postNum,
      user_id,
    ])
    .then((result) => result[0][0]);
}

module.exports.findJoin = findJoin;
