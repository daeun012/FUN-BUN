const jwtService = require('../services/jwtService');
const { saveMessage } = require('../controllers/messageController');
const { updateChat } = require('../controllers/chatController');
const chatService = require('../services/chatService');

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
      io.to(chatId).emit('newMessage', message);
      console.log('sendMessage data=>', message, 'time=>', new Date().toLocaleString());
      fn(message);
    });

    socket.on('joinChat', async (chatId, fn) => {
      try {
        // 존재하고 있는 채팅방인지 확인
        let chat = await chatService.getChat(chatId);
        if (chat.error) throw chat.error;

        // 이미 참여하고 있는 채팅방인지 확인
        let checkJoin = await chatService.checkJoin(socket.uid, chat);
        if (checkJoin.error) throw checkJoin.error;

        chat = await updateChat(socket.uid, chatId);
        let statusMessage = await saveMessage(socket.uid, chatId, { content: '님이 입장하셨습니다.', statusMessage: true });

        console.log('joinGroup data=>', chat, 'time=>', new Date().toLocaleString());

        io.to(chatId).emit('newMessage', statusMessage);

        fn(chat);
      } catch (err) {
        socket.emit('error', { type: 'JOIN_CHAT_FAILURE', message: err.message });
      }
    });

    socket.on('mountChat', (chatId) => {
      socket.join(chatId);
      console.log('mountChat data=>', chatId, 'time=>', new Date().toLocaleString());
    });

    socket.on('umountChat', (chatId) => {
      socket.leave(chatId);
    });
  });

  return (req, res, next) => {
    res.io = io;
    next();
  };
}

module.exports = socketEevents;
