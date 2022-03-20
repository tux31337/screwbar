/* const {v4} = require('uuid');
const db = require('../../config/db/database.js')
const mongodb = require('../../config/db/mongodb.js')
const userRepository = require('../auth/authRepository.js');
const test = require('../../bin/www')
const chatRepository = require('./chatRepository.js');



async function createChat(req, res) {
    console.log(req.body.user);
    console.log(req.body.peerUserId);
    mongodb.getChat().find({$and : [{$or:[{peerUserId: {$eq: req.body.user}}, {peerUserId: {$eq: req.body.peerUserId}}],$or:[{user: {$eq: req.body.user}}, {user: {$eq: req.body.peerUserId}}]}]}).toArray((err, data) => {
        console.log(data);
        if(data != "") {
            let id = data[0]._id;
            data[0].chatMessage.push(req.body.chatMessage[0]);
            mongodb.getChat().updateOne({_id:id}, {$set:{chatMessage: data[0].chatMessage}}) 
        } else {
            mongodb.getChat().insertOne(req.body);
        }
    })

     //const result = mongodb.getChat().insertOne(req.body);
    // const user = await userRepository.findById(req.userId)
    // const id = user.peerUserId;
    // const name = user.peerUsername;
    // // let socket = test.login_user[id];
    // console.log(id);c
    // console.log(name); 
    //const result = getChat.getChat().insertOne(user);
}

async function getChatList(req, res) {
    const userId = req.userId;
    const result = mongodb.getChat().find({$or:[{peerUserId: {$eq: req.userId}}, {user: {$eq: req.userId}}]}).toArray((err, data) => {
        res.status(200).json({data : data});
    });
}

module.exports.createChat = createChat; 
module.exports.getChatList = getChatList;  */
