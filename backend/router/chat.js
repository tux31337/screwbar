const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/thirdpary/auth.js');
const chatService = require('../middlewares/chat/chatService.js');

router.post("/insertChat", isAuth, chatService.createChat);


module.exports = router;