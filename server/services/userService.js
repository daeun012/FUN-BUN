const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

module.exports = {
  getUser: async (data) => {
    let userId = data.userId;
    let password = data.password;

    let result = await User.findeOne({ userId });
    if (result) {
      if (!result.validateHash(password)) return { error: '잘못된 아이디 또는 패스워드입니다.' };
      if (result.auth == 0) return { error: '인증이 완료되지 않은 계정입니다.' };
      return result;
    } else return { error: '잘못된 아이디 또는 패스워드입니다.' };
  },

  getUserData: async (uid) => {
    let result = await User.findeOne({ uid });
    return result;
  },

  getUserChats: async (uid) => {
    let result = await Chat.find({ creator: uid }).limit(5).populate({ path: 'creator', select: 'userId username' }).sort({ createdAt: -1 });
    return result || [];
  },

  countUserMessages: async (uid) => {
    let result = await Message.find({ sender: uid, statusMessage: false }).count();
    return result || 0;
  },
};
