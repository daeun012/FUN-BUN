const User = require('../models/User');
const inputService = require('../services/inputService');
const jwtUtils = require('../services/jwtService');
const mailService = require('../services/mailService');
const userService = require('../services/userService');

module.exports = {
  login: async (req, res, next) => {
    let userId = req.body.userId;
    let password = req.body.password;
    try {
      let user = await User.findOne({ userId });
      if (user) {
        if (!user.validateHash(password)) throw '잘못된 아이디 또는 패스워드입니다.';
        if (user.auth == 0) throw '인증이 완료되지 않은 계정입니다.';
        return res.status(200).json({
          message: '로그인 성공',
          token: jwtUtils.tokenGenerator([user._id, user.userId]),
        });
      } else throw '잘못된 아이디 또는 패스워드입니다.';
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: err });
    }
  },

  register: async (req, res, next) => {
    let userId = req.body.userId;
    let password = req.body.password;
    let username = req.body.username;
    let email = req.body.email;
    let studentId = req.body.studentId;
    let grade = req.body.grade;
    let dept = req.body.dept;

    // userId, email, studentId DB 중복 검사
    let err;
    err = await inputService.userId(userId);
    if (err.error) return res.status(400).json({ error: err.error });
    err = await inputService.email(email);
    if (err.error) return res.status(400).json({ error: err.error });
    err = await inputService.studentId(studentId);
    if (err.error) return res.status(400).json({ error: err.error });

    let uniqid = (new Date().getTime() + Math.floor(Math.random() * 10000 + 1)).toString(16);

    const newUser = new User({
      userId,
      password,
      username,
      email,
      studentId,
      grade,
      dept,
      key: uniqid,
    });

    newUser.password = newUser.generateHash(newUser.password);

    // 회원가입
    try {
      let user = await newUser.save();

      // 메일 전송
      let link = 'https://localhost:3000/register/' + user.key;
      mailService.registerMail(user.email, user.username, link);
      return res.status(200).json({ status: 'success' });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
  },

  getUserData: async (req, res, next) => {
    let uid = req.params.uid;
    console.log(uid);

    let user = await userService.getUser(uid);
    let userChats = await userService.getUserChats(uid);
    let countUserMessages = await userService.countUserMessages(uid);

    if (user.error) return res.status(401).json({ message: user.error });

    let data = Object.assign({}, user, { userChats, countUserMessages });
    return res.status(200).json({
      user: data,
    });
  },
};
