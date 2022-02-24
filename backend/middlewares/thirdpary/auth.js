const jwt = require('jsonwebtoken');
const authRepository = require('../auth/authRepository');
const config = require('../../config/config.js');
const AUTH_ERROR = { message: '사용자 인증에 실패했습니다'};

const isAuth = async (req, res, next) => {
  console.log('hi');
  let token;
  const authHeader = req.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  //해데어 토큰 없을 시
  if(!token) {
    token = req.cookies['token'];
  }

  if(!token) {
    return res.status(401).json(AUTH_ERROR);
  }
  jwt.verify(token, config.jwt.secretKey, async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await authRepository.findById(decoded.userId);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.user_id;
    req.token = token;
    next();
  });
};

module.exports = isAuth;