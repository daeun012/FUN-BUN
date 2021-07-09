let express = require('express');
let authController = require('../controllers/authController');

exports.router = (() => {
  let authRouter = express.Router();
  authRouter.route('/register').post(authController.register);
  /*   authRouter.route('/register/:key').get(authController.checkValidity); */
  authRouter.route('/login').post(authController.login);
  return authRouter;
})();
