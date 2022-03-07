
const {MongoClient} = require('mongodb');
const config = require('../config.js');

const client =  new MongoClient(config.mongodb.host);
let database;
async function connectDB() {
    await client.connect();
    database = client.db("test");
}

function getChat() {
    console.log("=====")
    console.log(database);
    return database.collection('chat');
}

module.exports.connectDB = connectDB;
module.exports.getChat = getChat;