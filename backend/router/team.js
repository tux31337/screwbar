const express = require('express');
const router = express.Router();
const teamService = require('../middlewares/team/teamService.js');
const participantsService = require('../middlewares/team/participantsService.js');
const myTeamService = require('../middlewares/mypage/myTeamService.js');
const isAuth = require('../middlewares/thirdpary/auth.js');
const upload = require('../middlewares/thirdpary/multer.js');

router.post(
  '/createTeam',
  isAuth,
  upload.presentUpload.single('imgFile'),
  teamService.createTeam
);
router.post(
  '/postImg',
  isAuth,
  upload.postsUpload.single('img'),
  teamService.postImg
);
router.get('/getTeam', isAuth, teamService.getTeam);
router.get('/getDetailTeam', isAuth, teamService.getDetailTeam);

router.post(
  '/createTeam',
  isAuth,
  upload.presentUpload.single('imgFile'),
  teamService.createTeam
);
router.post(
  '/postImg',
  isAuth,
  upload.postsUpload.single('img'),
  teamService.postImg
);
router.get('/getTeam', isAuth, teamService.getTeam);
router.get('/getDetailTeam', isAuth, teamService.getDetailTeam);

//참가하기
router.post('/joinTeam', isAuth, participantsService.joinTeam);

//마이페이지 내 팀 현황
router.get('/getMyTeam', isAuth, myTeamService.getMyTeam);
router.get('/getDetailMyTeam', isAuth, myTeamService.getDetailMyTeam);

module.exports = router;
