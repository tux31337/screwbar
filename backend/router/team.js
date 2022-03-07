const express = require('express');
const router = express.Router();
const teamService = require('../middlewares/team/teamService.js');
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

module.exports = router;
