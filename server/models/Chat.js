const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model('Chat', chatSchema);
