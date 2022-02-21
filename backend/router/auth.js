const express = require('express');
const validate = require('../middlewares/thirdpary/validator.js');
const {body} = require('express-validator');
const sens = require('../middlewares/thirdpary/sens.js')
const authService = require('../middlewares/auth/authService.js')
const isAuth = require('../middlewares/thirdpary/auth.js');

const router = express.Router();
const validateSignIn = [
  body("phoneNumber").trim().isLength(11).withMessage("휴대폰 번호는 11자만 가능합니다"),
  body("password")
  .trim()
  .isLength({ min: 6 })
  .withMessage("password should be at least 5 characters"),
]

const validateSignUp = [
  body("username")
    .trim()
    .notEmpty()
    .isLength({ min: 2})
    .withMessage("이름은 2글자 이상 입력해주세요"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password should be at least 5 characters"),
  body("address")
    .trim()
    .isLength({ min: 5 })
    .withMessage("password should be at least 5 characters"),
  body("phoneNumber").trim().isLength(11).withMessage("휴대폰 번호는 11자만 가능합니다"),
  body("birthday").trim().isLength(8).withMessage("생년월일을 입력하세요 Ex)19940204"),
  validate,
];

//회원가입
router.post("/signup", validateSignUp, authService.signup);

// //로그인
router.post("/signin", validateSignIn, authService.signIn);

//
router.get('/me', isAuth, authService.me);

// //문자 인증 받기
router.post("/getVerificationCode", sens.sendVerificationSMS);

//문자 인증번호 확인
router.post("/checkVerificationCode", sens.confirmSms);
module.exports = router;
