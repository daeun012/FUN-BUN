const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

module.exports = {
  getUser: async (uid) => {
    try {
      let result = await User.findOne({ _id: uid }).lean();
      return result;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  },

  getUserChats: async (uid) => {
    let result = await Chat.find({ creator: uid }).limit(5).populate({ path: 'creator', select: 'userId username' }).sort({ createdAt: -1 }).lean();
    console.log(result, Boolean(result));
    return result || [];
  },

  countUserMessages: async (uid) => {
    let result = await Message.find({ sender: uid, statusMessage: false }).countDocuments();
    console.log(result, Boolean(result));
    return result || 0;
  },
};
