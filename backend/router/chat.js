const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/thirdpary/auth.js');
const chatService = require('../middlewares/chat/chatService.js');

router.post("/insertChat", isAuth, chatService.createChat);
router.get("/chatList", isAuth, chatService.getChatList);


module.exports = router;