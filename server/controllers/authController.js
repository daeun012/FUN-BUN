const User = require('../models/User');
const inputService = require('../services/inputService');
const jwtUtils = require('../services/jwtService');
const mailService = require('../services/mailService');
const userService = require('../services/userService');

module.exports = {
  login: async (req, res, next) => {
    let user = await userService.getUser({ userId: req.body.userId, password: req.body.password });

    if (user.error) return res.status(401).json({ message: user.error });
    else {
      let userData = user;
      let userChats = await userService.getUserChats(user._id);
      let countUserMessages = await userService.countUserMessges(user._id);
      let data = Object.assign({}, userData, { userChats, countUserMessages });
      return res.status(200).json({
        message: '로그인 성공',
        token: jwtUtils.tokenGenerator([user._id, user.userId]),
        user: data,
      });
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
      return res.status(400).json({ error: err });
    }
  },
};
