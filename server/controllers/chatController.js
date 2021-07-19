const Chat = require('../models/Chat');
const jwtService = require('../services/jwtService');
const userService = require('../services/userService');

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
    console.log('getallchat');
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
};
