let express = require('express');
let userController = require('../controllers/userController');

exports.router = (() => {
  let userRouter = express.Router();
  userRouter.route('/status/:uid').get(userController.getStatus);
  return userRouter;
})();
