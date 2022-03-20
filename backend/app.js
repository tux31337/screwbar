const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
const http = require('http');

const authRouter = require('./router/auth.js');
const teamRouter = require('./router/team.js');
const chatRouter = require('./router/chat.js');

const db = require('./config/db/database.js');
// const { connectDB } = require('./config/db/mongodb.js');

const app = express();
app.use(express.static(path.join(__dirname + '/public')));

const corsOption = {
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

app.use('/auth', authRouter);
app.use('/api', teamRouter);
app.use('/team', teamRouter);
// app.use('/chat', chatRouter);

// connectDB().then((data) => {});

db.getConnection().then((connection) => {});
app.use((req, res, next) => {
  console.log('app.js 404');
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

const httpServer = http.createServer(app);
let socket = 0;

const wsServer = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

let login_ids = {};
wsServer.on('connection', (socket) => {
  console.log(login_ids);

  socket.on('login', (data) => {
    login_ids[data.userId] = socket.id;
  });
  socket.on('chatting', (data) => {
    if (login_ids[data.message.recepient]) {
      socket
        .to(login_ids[data.message.recepient])
        .emit('message', data.message);
    }
  });
});

httpServer.listen(8080);
