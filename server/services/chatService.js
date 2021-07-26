const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

module.exports = {
  getChat: async (chatId) => {
    try {
      let result = await Chat.findById(chatId).populate({ path: 'creator', select: 'username' }).populate({ path: 'members', select: 'username' }).lean();
      if (!result) throw new Error('채팅방을 찾을 수 없습니다.');
      return result;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  },

  checkJoin: async (uid, chat) => {
    try {
      const isCreator = chat.creator._id.toString() === uid;
      const isMember = chat.members.some((member) => member._id.toString() === uid);
      if (isCreator || isMember) {
        throw new Error('이미 참여하고 있는 채팅방입니다.');
      }
      return { status: 'valid' };
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  },
};
