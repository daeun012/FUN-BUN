const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    userId: String,
    password: String,
    username: String,
    email: String,
    studentId: Number,
    grade: Number,
    dept: String,
    key: String,
    /*  
    match: { type: Boolean, default: 0 },
    auth: { type: Boolean, default: 0 }, 
    */
  },
  { timestamps: true }
);

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, 8);
};

userSchema.methods.validateHash = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
