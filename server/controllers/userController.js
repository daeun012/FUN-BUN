const User = require('../models/User');
const jwtUtils = require('../services/jwtService');
const userService = require('../services/userService');

module.exports = {
  getStatus: async (req, res, next) => {
    let uid = req.params.uid;
    if (uid.error) return res.status(401).json({ message: uid.error });

    let userData = await userService.getUserData(uid);
    let userChats = await userService.getUserChats(uid);
    let countUserMessages = await userService.countUserMessages(uid);

    if (userData.error) return res.status(401).json({ message: userData.error });

    let data = Object.assign({}, userData, { userChats, countUserMessages });
    return res.status(200).json({
      user: data,
    });
  },
};
