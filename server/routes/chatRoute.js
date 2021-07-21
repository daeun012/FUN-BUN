let express = require('express');
let chatController = require('../controllers/chatController');

exports.router = (() => {
  let chatRouter = express.Router();
  chatRouter.route('/create/:title').post(chatController.createChat);
  chatRouter.route('/allchat').get(chatController.getAllChatList);
  chatRouter.route('/mychat/:uid').get(chatController.getMyChatList);
  chatRouter.route('/:id').get(chatController.getChatData);
  return chatRouter;
})();
