const Message = require('../models/Message');

module.exports = {
  getAllMessage: async (chatId) => {
    let result = await Message.find({ chatId }).populate({ path: 'sender', select: 'username' }).sort({ createdAt: 1 });

    return result;
  },

  saveMessage: async (uid, chatId, data) => {
    try {
      const newMessage = new Message(
        Object.assign({}, data, {
          chatId,
          sender: uid,
        })
      );

      let savedMessage = await newMessage.save();
      let message = await Message.findById(savedMessage._id).populate({ path: 'sender', select: 'username' });
      return message;
    } catch (err) {
      throw new Error(err);
    }
  },
  deleteMessage: async (chatId) => {
    try {
      let result = await Message.remove({ chatId });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};
