const db = require('../../config/db/database.js');

// 평가 넣어주기
async function personalEvaluation(personal) {
  console.log(personal);
  console.log(personal.goodkind + personal.goodtime);
  const temperature =
    personal.goodkind +
    personal.goodtime +
    personal.goodmean -
    personal.badkind -
    personal.badtime -
    personal.badmean;
  return db
    .execute(
      'UPDATE temperature SET userTemp = userTemp + ?, goodkind = goodkind + ?, goodtime = goodtime + ?, goodmean = goodmean + ?, badkind = badkind + ?, badtime = badtime + ?, badmean = badmean + ? WHERE user_id = ?',
      [
        temperature,
        personal.goodkind,
        personal.goodtime,
        personal.goodmean,
        personal.badkind,
        personal.badtime,
        personal.badmean,
        personal.user_id,
      ]
    )
    .then((result) => result[0][0]);
}

module.exports.personalEvaluation = personalEvaluation;
