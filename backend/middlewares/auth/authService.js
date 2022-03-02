const userRepository = require('./authRepository.js');


const config = require('../../config/config.js');
const {v4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const clearCookie = require('cookie-parser');

const { options } = require('../../router/auth.js');


async function signup(req, res) {
  const { email, username, password, address, phoneNumber, birthday, gender } =
    req.body;
  const userID = v4();
  console.log(gender);
  console.log("birthday" + birthday);
  const findByNumbmer = await userRepository.findByNumbmer(phoneNumber);
  if(findByNumbmer) {
    return res.status(409).json({message: "이미 가입한 휴대폰 번호입니다."});
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const result = await userRepository.createUser({
    userID,
    email,
    username,
    password : hashed,
    address,
    phoneNumber,
    birthday,
    gender
  });
  if(!result) {
    return res.status(401).json({message: "회원 가입에 실패했습니다"});
  }
  res.status(200).json({message: "회원 가입에 성공했습니다"});
}

async function signIn(req, res) {
  const {email, password} = req.body;
  const findByEmail = await userRepository.findByEmail(email);
  console.log(findByEmail);
  if(!findByEmail) {
    return res.status(401).json({message: "아이디 또는 비밀번호를 확인하세요"});
  }
  const result = await bcrypt.compare(password,  findByEmail.password);
  if(!result) {
    return res.status(401).json({message: "아이디 또는 비밀번호를 확인하세요"});
  }
  const token = createJwtToken(findByEmail.user_id);
  setToken(res, token);
  res.status(200).json({token});
}

async function logout(req, res) {
  res.clearCookie('token').json({message: "logout success"});
}

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
  };
  res.cookie('token', token, options) 
}

async function me(req, res) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(401).json({message: '사용자를 찾을 수 없습니다'});
  }
  res.status(200).json({token:req.token, userId: user.user_id, isAuth: true});
}


function createJwtToken(userId) {
  return jwt.sign({userId}, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec});
}

async function myInfo(req, res) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(401).json({message: '사용자를 찾을 수 없습니다'});
  }

  /* user 나이 계산 */ 
  const birthday = user.birthday;
  const today = new Date();
  const year = today.getFullYear();
  const age =  year -birthday.substr(0, 4);

  res.status(200).json({userId: user.user_id, userName: user.username, age: age, phonenumber: user.phonenumber, gender: user.gender, email: user.email})
}


async function emailDuplicateCheck(req, res) {
  console.log(req.query);
  const user = await userRepository.findByEmail(req.query.email);
  if (!user) {
    return res.status(200).json({message: '회원가입을 진행해주세요', status: true});
  } else {
    return res.status(200).json({message: '중복회원 입니다.', status: false});
  }
}

module.exports.signup = signup;
module.exports.signIn = signIn;
module.exports.me = me;
module.exports.logout = logout;
module.exports.myInfo = myInfo;
module.exports.emailDuplicateCheck = emailDuplicateCheck;


