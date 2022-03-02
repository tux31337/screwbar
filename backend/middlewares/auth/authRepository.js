const db = require('../../config/db/database.js')
async function createUser(user) {
  const { userID, email, username, password, address, phoneNumber, birthday, gender} = user;
  return db
    .execute(
      "INSERT INTO users (user_id, email, username, password, address, phonenumber, birthday, gender) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
      [userID, email, username, password, address, phoneNumber, birthday, gender]
    )
    .then((result) => {
      return result;
    });
}

async function findByNumbmer(phoneNumber) {
  return db
    .execute("SELECT * FROM users WHERE phonenumber=?", [phoneNumber])
    .then((result) => result[0][0]);
}

async function findByEmail(email) {
  return db
    .execute("SELECT * FROM users WHERE email=?", [email])
    .then((result) => result[0][0]);
}

async function findById(userId) {
  return db
    .execute("SELECT * FROM users WHERE user_id=?", [userId])
    .then((result) => result[0][0]);
} 

module.exports.createUser = createUser;
module.exports.findByNumbmer = findByNumbmer;
module.exports.findByEmail = findByEmail;
module.exports.findById = findById;





