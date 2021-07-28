const Message = require('../models/Message');

module.exports = {
  getAllMessage: async (chatId) => {
    let result = await Message.find({ chatId }).populate({ path: 'sender', select: 'username' }).sort({ createdAt: 1 });

    return result;
  },

  saveMessage: async (uid, chatId, data) => {
    const newMessage = new Message(
      Object.assign({}, data, {
        chatId,
        sender: uid,
      })
    );
    try {
      let savedMessage = await newMessage.save();
      let message = await Message.findById(savedMessage._id).populate({ path: 'sender', select: 'username' });
      return message;
    } catch (err) {
      console.log(err);
    }
  },
};
