const jwtService = require('../services/jwtService');
const { saveMessage } = require('../controllers/chatController');

function socketAuth(socket, next) {
  console.log('auth');
  const token = socket.handshake.query.token;

  if (jwtService.verifyToken(token)) {
    socket.uid = jwtService.verifyToken(token).id;
    console.log('verify socket token success=>', socket.uid);
    return next();
  }
  return next(new Error(`Authentication error! time =>${new Date().toLocaleString()}`));
}

function socketEevents(io) {
  io.use(socketAuth);

  io.on('connection', (socket) => {
    const socketId = socket.id;
    console.log('connection socketId=>', socketId, 'time=>', new Date().toLocaleString());

    socket.on('sendMessage', async (newMessage, fn) => {
      const { chatId, content } = newMessage;
      let message = await saveMessage(socket.uid, chatId, { content });
      io.to(chatId).emit('newMessage', {
        message,
      });
    });

    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
    });

    socket.on('leaveChat', (chatId) => {
      socket.leave(chatId);
    });
  });

  return (req, res, next) => {
    res.io = io;
    next();
  };
}

module.exports = socketEevents;
