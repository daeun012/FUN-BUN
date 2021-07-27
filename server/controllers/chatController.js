const Chat = require('../models/Chat');
const Message = require('../models/Message');
const jwtService = require('../services/jwtService');
const chatService = require('../services/chatService');
const { saveMessage } = require('../controllers/messageController');
const messageController = require('../controllers/messageController');

module.exports = {
  getAllChatList: async (req, res, next) => {
    try {
      let allChat = await Chat.find().populate({ path: 'creator', select: 'username' }).populate({ path: 'members', select: 'username' }).lean();
      return res.status(200).json({
        allChat: allChat,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err });
    }
  },

  getMyChatList: async (req, res, next) => {
    try {
      let uid = req.params.uid;
      let myChat = await Chat.find({ $or: [{ creator: uid }, { members: uid }] })
        .populate({ path: 'creator', select: 'username' })
        .populate({ path: 'members', select: 'username' })
        .lean();
      return res.status(200).json({
        myChat: myChat,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err });
    }
  },

  getChatData: async (req, res, next) => {
    try {
      let chatId = req.params.id;
      let activeChat = await chatService.getChat(chatId);
      if (activeChat.error) throw activeChat.error;

      let allMessage = await Message.find({ chatId }).populate({ path: 'sender', select: 'username' }).sort({ createdAt: 1 });

      return res.status(200).json({
        activeChat: activeChat,
        messages: allMessage,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err });
    }
  },

  updateChat: async (uid, chatId) => {
    try {
      let result = await Chat.findOneAndUpdate({ _id: chatId }, { $push: { members: uid } }, { new: true })
        .populate({ path: 'creator', select: 'username' })
        .populate({ path: 'members', select: 'username' })
        .lean();

      return result;
    } catch (err) {
      console.log(err);
    }
  },

  createChat: async (uid, title, desc) => {
    try {
      const newChat = new Chat({
        creator: uid,
        title,
        description: desc,
        members: uid,
      });

      let result = await newChat.save();
      return result;
    } catch (err) {
      console.log(err);
    }
  },

  leaveChat: async (uid, chatId) => {
    try {
      let result = await Chat.findByIdAndUpdate(chatId, { $pull: { members: uid } }, { new: true })
        .populate({ path: 'creator', select: 'username' })
        .populate({ path: 'members', select: 'username' })
        .lean();

      return result;
    } catch (err) {
      console.log(err);
    }
  },
  deleteChat: async (chatId) => {
    try {
      await Chat.findByIdAndRemove(chatId);
    } catch (err) {
      console.log(err);
    }
  },
};
