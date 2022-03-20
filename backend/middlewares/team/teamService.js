const { v4 } = require('uuid');
const db = require('../../config/db/database.js');
const fs = require('fs');
const participantsRepository = require('./participantsRepository.js');

async function createTeam(req, res) {
  const teamId = v4();
  const {personnel,price,excercise,date,temperature,content,title,deleteUrl,discloseInfo, deadline, area} = req.body;
  const IMG_URL = req.file? `http://localhost:8080/uploads/present/${req.userId}/${req.file.filename}`: null;
  const userId = req.userId;
  if (deleteUrl) {
    deleteImg(deleteUrl);
  }
  return db
    .execute(
      'INSERT INTO posting (postNum, user_id, meetingDate, cost, title, contents, postImg, participants, sportName, areaName, discloseInfo, temperature, deadline) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [teamId,userId,date,price,title,content,IMG_URL,personnel,excercise,area,discloseInfo,temperature, new Date(deadline)])
    .then((data) => {
      // 작성자 참여자에 넣어주기
      participantsRepository.insertParticipant(teamId, userId);
      return res.status(200).json({ message: '생성 성공' });
    });
}

async function getTeam(req, res) {
  let page = parseInt(req.query.page);
  let sport = req.query.sport;
  let area = req.query.area;
  let start =  page * 8;
  let end =  (1 + page) * 8; 
  if(sport && !area) {
    return db
      .execute(
        `SELECT posting.postNum, posting.user_id, posting.headCount, posting.meetingDate, posting.cost, posting.title, posting.contents, posting.postImg, posting.participants, posting.sportName, posting.areaName, posting.discloseInfo, posting.temperature, posting.deadline, posting.closed, users.email, users.username, users.birthday, users.phoneNumber, users.gender from posting inner join users on posting.user_id = users.user_id   WHERE posting.closed = 0 AND posting.sportName= '${sport}' ORDER BY posting.regDate desc LIMIT ${start}, ${end}`
      ).then((result) => {
        return res.status(200).json({ message: result[0], paging : page + 1});
      }); 
  } else if(!sport && area) {
    return db
    .execute(
      `SELECT posting.postNum, posting.user_id, posting.headCount, posting.meetingDate, posting.cost, posting.title, posting.contents, posting.postImg, posting.participants, posting.sportName, posting.areaName, posting.discloseInfo, posting.temperature, posting.deadline, posting.closed, users.email, users.username, users.birthday, users.phoneNumber, users.gender from posting inner join users on posting.user_id = users.user_id   WHERE posting.closed = 0 AND posting.areaName= '${area}' ORDER BY posting.regDate desc LIMIT ${start}, ${end}`
    ).then((result) => {
      return res.status(200).json({ message: result[0], paging : page + 1});
    }); 
  } else if(sport && area) {
    return db
    .execute(
      `SELECT posting.postNum, posting.user_id, posting.headCount, posting.meetingDate, posting.cost, posting.title, posting.contents, posting.postImg, posting.participants, posting.sportName, posting.areaName, posting.discloseInfo, posting.temperature, posting.deadline, posting.closed, users.email, users.username, users.birthday, users.phoneNumber, users.gender from posting inner join users on posting.user_id = users.user_id   WHERE posting.closed = 0 AND posting.areaName= '${area}' AND posting.sportName= '${sport}' ORDER BY posting.regDate desc LIMIT ${start}, ${end}`
    ).then((result) => {
      return res.status(200).json({ message: result[0], paging : page + 1});
    }); 
  }
  return db
    .execute(
      `SELECT posting.postNum, posting.user_id, posting.headCount, posting.meetingDate, posting.cost, posting.title, posting.contents, posting.postImg, posting.participants, posting.sportName, posting.areaName, posting.discloseInfo, posting.temperature, posting.deadline, posting.closed, users.email, users.username, users.birthday, users.phoneNumber, users.gender from posting inner join users on posting.user_id = users.user_id   WHERE posting.closed = 0 ORDER BY posting.regDate desc LIMIT ${start}, ${end}`
    )
    .then((result) => {
      return res.status(200).json({ message: result[0], paging : page + 1});
    });
}

async function getDetailTeam(req, res) {
  return res.status(200);
}

function postImg(req, res) {
  const IMG_URL = `http://localhost:8080/uploads/posts/${req.userId}/${req.file.filename}`;
  res.json({ url: IMG_URL });
}

function deleteImg(req, res) {
  let deleteArr = req.split(',');
  for (let i = 0; i < deleteArr.length; i++) {
    fs.unlink(
      `public/uploads/posts/${req.uesrId}/${deleteArr[i].slice(36)}`,
      (err) => {
        console.log(err);
      }
    );
  }
}

async function teamCount(req, res) {
  return db.execute('SELECT count(*) as count from posting').then((result) => {    
    return res.status(200).json({ page: (Math.ceil(result[0][0].count / 9))})
  });
}

module.exports.createTeam = createTeam;
module.exports.postImg = postImg;
module.exports.getTeam = getTeam;
module.exports.getDetailTeam = getDetailTeam;
module.exports.teamCount = teamCount;

