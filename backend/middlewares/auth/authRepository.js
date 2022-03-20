const db = require('../../config/db/database.js');
async function createUser(user) {
  const {
    userID,
    email,
    username,
    password,
    address,
    phoneNumber,
    birthday,
    gender,
  } = user;
  db.execute(
    'INSERT INTO users (user_id, email, username, password, address, phonenumber, birthday, gender) VALUES(?, ?, ?, ?, ?, ?, ?, ?) ',
    [userID, email, username, password, address, phoneNumber, birthday, gender]
  ).then((result) => {});
  return db.execute(
    'INSERT INTO temperature(user_id, userTemp, goodkind, badkind, goodtime, badtime, goodmean, badmean) VALUES(?,?, ?, ?, ?, ?, ?, ?)',
    [userID, '36.5', 0, 0, 0, 0, 0, 0]
  );
}

async function findByNumbmer(phoneNumber) {
  return db
    .execute('SELECT * FROM users WHERE phonenumber=?', [phoneNumber])
    .then((result) => result[0][0]);
}

async function findByEmail(email) {
  return db
    .execute('SELECT * FROM users WHERE email=?', [email])
    .then((result) => result[0][0]);
}

async function findById(userId) {
  return db
    .execute('SELECT * FROM users WHERE user_id=?', [userId])
    .then((result) => result[0][0]);
}

async function getHeadCount(postNum) {
  return db
    .execute('SELECT headCount FROM posting WHERE postNum = ?', [postNum])
    .then((result) => result[0][0]);
}

async function findEmail(username, phoneNumber) {
  return db
    .execute('SELECT email FROM users WHERE username =? AND phonenumber=?', [
      username,
      phoneNumber,
    ])
    .then((result) => result[0][0]);
}

async function changePassword(email, password) {
  return db
    .execute('UPDATE users SET password = ? WHERE email = ?', [password, email])
    .then((result) => result[0]);
}

module.exports.createUser = createUser;
module.exports.findByNumbmer = findByNumbmer;
module.exports.findByEmail = findByEmail;
module.exports.findById = findById;
module.exports.getHeadCount = getHeadCount;
module.exports.findEmail = findEmail;
module.exports.changePassword = changePassword;
