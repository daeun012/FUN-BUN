const Chat = require('../models/Chat');
const Message = require('../models/Message');
const jwtService = require('../services/jwtService');
const chatService = require('../services/chatService');
const { saveMessage } = require('../controllers/messageController');
const messageController = require('../controllers/messageController');

module.exports = {
  createChat: async (req, res, next) => {
    let title = req.params.title;
    let desc = req.body.desc;
    var uid = jwtService.verifyToken(req.body['token'])['id'];

    const newChat = new Chat({
      creator: uid,
      title,
      description: desc,
    });

    try {
      let chat = await newChat.save();
      /*   let allChat = await Chat.find().populate({ path: 'creator', select: 'username' }).populate({ path: 'members', select: 'username' }).lean();
      return res.status(200).json({
        allChat: allChat,
      }); */
    } catch (err) {
      console.log(err);
    }
  },

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
      /*    let chatId = req.params.id;
      let uid = jwtService.verifyToken(req.body['token'])['id'];

      // 존재하고 있는 채팅방인지 확인
      let chat = await chatService.getChat(chatId);
      if (chat.error) throw chat.error;

      // 이미 참여하고 있는 채팅방인지 확인
      let checkJoin = await chatService.checkJoin(chat);
      if (checkJoin.error) throw checkJoin.error;
 */
      let result = await Chat.findOneAndUpdate({ _id: chatId }, { $push: { members: uid } }, { new: true })
        .populate({ path: 'creator', select: 'username' })
        .populate({ path: 'members', select: 'username' })
        .lean();

      /*  let statusMessage = await saveMessage(uid, chatId, {
        content: ' 입장하셨습니다.',
        statusMessage: true,
      }); */

      /*   res.io.to(chatId).emit('newMessage', statusMessage); */

      return result;
    } catch (err) {
      console.log(err);
    }
  },
};
