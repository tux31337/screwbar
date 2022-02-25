const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');



const config = require('./config/config.js');
const authRouter = require('./router/auth.js');
const teamRouter = require('./router/team.js');
const db = require('./config/db/database.js');


const app = express();
app.use(express.static(path.join(__dirname + '/public'))); 

console.log(path.join(__dirname + '/public'));

const corsOption = {
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
}


app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));




app.use("/auth", authRouter);
app.use('/api', teamRouter)
app.use("/team", teamRouter);




db.getConnection().then((connection) => {});
app.use((req, res, next) => {
    console.log("app.js 404");
    res.sendStatus(404);
  });
  app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
  });




module.exports = app;