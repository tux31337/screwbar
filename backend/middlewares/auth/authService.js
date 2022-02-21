const userRepository = require('./authRepository.js');


const config = require('../../config/config.js');
const {v4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function signup(req, res) {
  const { email, username, password, address, phoneNumber, birthday } =
    req.body;
  const userId = v4();
  const findByNumbmer = await userRepository.findByNumbmer(phoneNumber);
  if(findByNumbmer) {
    return res.status(409).json({message: "이미 가입한 휴대폰 번호입니다."});
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const result = await userRepository.createUser({
    userId,
    email,
    username,
    password : hashed,
    address,
    phoneNumber,
    birthday
  });
  if(!result) {
    return res.status(401).json({message: "아이디 또는 비밀번호를 확인하세요"});
  }
  res.status(200).json({message: "회원 가입에 성공했습니다"});
}

async function signIn(req, res) {
  const {phoneNumber, password} = req.body;
  const findByNumbmer = await userRepository.findByNumbmer(phoneNumber);
  if(!findByNumbmer) {
    return res.status(401).json({message: "아이디 또는 비밀번호를 확인하세요"});
  }
  const result = await bcrypt.compare(password,  findByNumbmer.password);
  if(!result) {
    return res.status(401).json({message: "아이디 또는 비밀번호를 확인하세요"});
  }
  const token = createJwtToken(findByNumbmer.userId);
  res.status(200).json({token});
}

async function me(req, res) {
  console.log(req.userId);
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({message: '사용자를 찾을 수 없습니다'});
  }
  res.status(200).json({token:req.token, userId: user.userId});
}


function createJwtToken(userId) {
  return jwt.sign({userId}, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec});
}

module.exports.signup = signup;
module.exports.signIn = signIn;
module.exports.me = me;

