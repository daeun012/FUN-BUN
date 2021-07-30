const Chat = require('../models/Chat');
const Match = require('../models/Match');
const chatService = require('../services/chatService');
const matchService = require('../services/matchService');
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

      // 매칭된 채팅 가져오기
      let matchChat = await Match.findOne({ members: uid }).populate({ path: 'members', select: 'username grade' }).lean();
      console.log(matchChat);
      // 참여한 채팅 가져오기
      let myChat = await Chat.find({ members: uid }).populate({ path: 'members', select: 'username' }).lean();

      return res.status(200).json({
        myChat: myChat,
        matchChat: matchChat,
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

  getMatchData: async (req, res, next) => {
    try {
      let matchId = req.params.id;
      // 채팅방 정보 가져오기
      let activeChat = await matchService.getMatch(matchId);

      // 채팅방 메시지 가져오기
      let allMessage = await messageService.getAllMessage(matchId);

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
