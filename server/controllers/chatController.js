const Chat = require('../models/Chat');
const Match = require('../models/Match');
const Message = require('../models/Message');
const chatService = require('../services/chatService');
const messageService = require('../services/messageService');

module.exports = {
  getAllChatList: async (req, res, next) => {
    try {
      let allChat = await Chat.find({}, { member: false }).populate({ path: 'creator', select: 'username' }).lean();
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
      let matchMessages;
      // 매칭된 채팅 가져오기
      let myMatch = await Match.findOne({ members: uid }).populate({ path: 'members', select: 'username grade' }).lean();
      if (myMatch) {
        // 매칭된 채팅의 메시지 가져오기
        matchMessages = await Message.find({ chatId: myMatch._id }).populate({ path: 'sender', select: 'username' }).sort({ createdAt: 1 });
      } else {
        matchMessages = [];
      }

      // 참여한 채팅 가져오기
      let myChat = await Chat.find({ members: uid }, { members: false }).lean();

      return res.status(200).json({
        myChat: myChat,
        myMatch: myMatch,
        matchMessages: matchMessages,
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
      let activeMessages = await messageService.getAllMessage(chatId);

      return res.status(200).json({
        activeChat: activeChat,
        activeMessages: activeMessages,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
  },
};
