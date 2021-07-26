let express = require('express');
let userController = require('../controllers/userController');

exports.router = (() => {
  let userRouter = express.Router();
  userRouter.route('/register').post(userController.register);
  /*   userRouter.route('/register/:key').get(authController.checkValidity); */
  userRouter.route('/login').post(userController.login);
  userRouter.route('/data/:uid').get(userController.getUserData);
  return userRouter;
})();
