
const {MongoClient} = require('mongodb');
const config = require('../config.js');

let db;
const connectDB = () => {
    return new MongoClient(config.mongodb.host).connect()
    .then((client) => {
       db = client.db();
    });
}

function getChat() {
    return db.collection('chat');
}

module.exports.connectDB = connectDB;
module.exports.getChat = getChat;

//module.exports.getChat = getChat;