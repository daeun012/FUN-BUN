const Chat = require('../models/Chat');

module.exports = {
  getChat: async (chatId) => {
    try {
      let result = await Chat.findById(chatId).populate({ path: 'creator', select: 'username' }).populate({ path: 'members', select: 'username' }).lean();
      if (!result) throw new Error('채팅방을 찾을 수 없습니다.');
      return result;
    } catch (err) {
      throw err;
    }
  },

  checkJoin: async (uid, chat) => {
    try {
      const isMember = chat.members.some((member) => member._id.toString() === uid);
      if (isMember) {
        throw new Error('이미 참여하고 있는 채팅방입니다.');
      }
      return { status: 'valid' };
    } catch (err) {
      throw err;
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
      throw new Error(err);
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
      throw new Error(err);
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
      throw new Error(err);
    }
  },

  deleteChat: async (chatId) => {
    try {
      let result = await Chat.findByIdAndRemove(chatId);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};
