const {v4} = require('uuid');
const db = require('../../config/db/database.js')
const getChat = require('../../config/db/mongodb.js')
const userRepository = require('../auth/authRepository.js');


async function createChat(req, res) {
    
    const user = await userRepository.findById(req.userId);
    const result = getChat.getChat().insertOne(user);
    console.log(result);
}

module.exports.createChat = createChat;