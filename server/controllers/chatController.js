const Chat = require('../models/Chat');
const chatService = require('../services/chatService');
const messageService = require('../services/messageService');

module.exports = {
  getAllChatList: async (req, res, next) => {
    try {
      let allChat = await Chat.find().populate({ path: 'creator', select: 'username' }).populate({ path: 'members', select: 'username' }).lean();
      return res.status(200).json({
        allChat,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
  },

  getMyChatList: async (req, res, next) => {
    try {
      let uid = req.params.uid;
      let myChat = await Chat.find({ members: uid }).populate({ path: 'members', select: 'username' }).lean();
      return res.status(200).json({
        myChat,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
  },

  getChatData: async (req, res, next) => {
    try {
      let chatId = req.params.id;
      // 채팅방 정보 가져오기
      let activeChat = await chatService.getChat(chatId);

      // 채팅방 메시지 가져오기
      let allMessage = await messageService.getAllMessage(chatId);

      return res.status(200).json({
        activeChat: activeChat,
        messages: allMessage,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
  },
};
