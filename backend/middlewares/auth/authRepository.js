const db = require('../../config/db/database.js')
async function createUser(user) {
  const { userId, email, username, password, address, phoneNumber, birthday } = user;
  return db
    .execute(
      "INSERT INTO users (userId, email, username, password, address, phonenumber, birthday) VALUES(?, ?, ?, ?, ?, ?, ?)",
      [userId, email, username, password, address, phoneNumber, birthday]
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

async function findById(userId) {
  return db
    .execute("SELECT * FROM users WHERE userId=?", [userId])
    .then((result) => result[0][0]);
} 

module.exports.createUser = createUser;
module.exports.findByNumbmer = findByNumbmer;
module.exports.findById = findById;





