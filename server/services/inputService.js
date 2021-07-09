let User = require('../models/User');
module.exports = {
  userId: async (data) => {
    let result = await User.find({ userId: data });
    if (result) return { error: '이미 회원가입 되어있는 아이디 입니다.' };
    else return { status: 'valid' };
  },

  email: async (data) => {
    let result = await User.find({ email: data });
    if (result) return { error: '이미 회원가입 되어있는 이메일입니다.' };
    else return { status: 'valid' };
  },

  studentId: async (data) => {
    var result = await User.find({ studentId: data });
    if (result) return { error: '이미 회원가입 되어있는 학번입니다.' };
    else return { status: 'valid' };
  },
};
