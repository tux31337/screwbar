const express = require('express');
const validate = require('../middlewares/thirdpary/validator.js');
const { body } = require('express-validator');
const sens = require('../middlewares/thirdpary/sens.js');
const authService = require('../middlewares/auth/authService.js');
const isAuth = require('../middlewares/thirdpary/auth.js');
const myTeamService = require('../middlewares/mypage/myTeamService.js');
const router = express.Router();
const validateSignIn = [
  body('phoneNumber')
    .trim()
    .isLength(11)
    .withMessage('휴대폰 번호는 11자만 가능합니다'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('password should be at least 5 characters'),
];

const validateSignUp = [
  body('username')
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('이름은 2글자 이상 입력해주세요'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('password should be at least 5 characters'),
  body('address')
    .trim()
    .isLength({ min: 2 })
    .withMessage('구 이름을 입력해주세요'),
  body('phoneNumber')
    .trim()
    .isLength(11)
    .withMessage('휴대폰 번호는 11자만 가능합니다'),
  validate,
];

//회원가입
router.post('/signup', validateSignUp, authService.signup);

//로그인
router.post('/signin', validateSignIn, authService.signIn);

//로그아웃
router.get('/logout', isAuth, authService.logout);

// me 구현
router.get('/me', isAuth, authService.me);

// 내정보 가져오기
router.get('/myInfo', isAuth, authService.myInfo);

//이메일 중복 체크
router.get('/emailDuplicateCheck', authService.emailDuplicateCheck);
//문자 인증 받기
router.post('/getVerificationCode', sens.sendVerificationSMS);

//문자 인증번호 확인
router.post('/checkVerificationCode', sens.confirmSms);

//이메일 찾기
router.post('/findEmail', authService.findEmail);

//비밀번호 찾기
router.post('/changePassword', authService.changePassword);

//비밀번호 찾기
router.post('/newPassword', isAuth, authService.newPassowrd);

//주소 변경
router.post('/newAddress', isAuth, authService.newAddress);

module.exports = router;
