const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dept: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Match', matchSchema);
