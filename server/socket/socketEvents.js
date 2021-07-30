const jwtService = require('../services/jwtService');
const chatService = require('../services/chatService');
const messageService = require('../services/messageService');
const matchService = require('../services/matchService');
function socketAuth(socket, next) {
  const { token } = socket.handshake.query;

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
    console.log('connection socketId=>', socket.id, 'time=>', new Date().toLocaleString());

    socket.on('sendMessage', async (newMessage, fn) => {
      try {
        const { chatId, content } = newMessage;
        let message = await messageService.saveMessage(socket.uid, chatId, { content });
        io.to(chatId).emit('newMessage', message);
        console.log('sendMessage data=>', message.content, 'time=>', new Date().toLocaleString());
        fn(message);
      } catch (err) {
        conosle.log(err);
      }
    });

    socket.on('randomMatch', async (grade, dept, fn) => {
      try {
        // 들어갈 수 있는 매칭방 가져오기
        let match = await matchService.getRandomMatch(grade, dept);

        if (match) {
          // 있다면 매치 업데이트
          let updatedMatch = await matchService.updateMatch(socket.uid, match._id);
          let statusMessage = await messageService.saveMessage(socket.uid, match._id, { content: '님이 입장하셨습니다.', statusMessage: true });

          console.log('updateMatch data=>', match._id, 'time=>', new Date().toLocaleString());

          io.to(match._id).emit('newMessage', statusMessage);

          fn(updatedMatch);
        } else {
          // 없다면 매치 생성
          let createdMatch = await matchService.createMatch(socket.uid, dept);
          let match = await matchService.getMatch(createdMatch._id);
          console.log('createMatch data=>', createdMatch._id, 'time=>', new Date().toLocaleString());

          fn(match);
        }
      } catch (err) {
        socket.emit('error', { type: 'RANDOM_MATCH_FAILURE', message: err.message });
      }
    });

    socket.on('joinChat', async (chatId, fn) => {
      try {
        // 존재하고 있는 채팅방인지 확인
        let chat = await chatService.getChat(chatId);

        // 이미 참여하고 있는 채팅방인지 확인
        await chatService.checkJoin(socket.uid, chat);

        let updatedChat = await chatService.updateChat(socket.uid, chatId);
        let statusMessage = await messageService.saveMessage(socket.uid, chatId, { content: '님이 입장하셨습니다.', statusMessage: true });

        console.log('joinChat data=>', chatId, 'time=>', new Date().toLocaleString());

        io.to(chatId).emit('newMessage', statusMessage);

        fn(updatedChat);
      } catch (err) {
        socket.emit('error', { type: 'JOIN_CHAT_FAILURE', message: err.message });
      }
    });

    socket.on('createChat', async (title, desc, fn) => {
      try {
        // 채팅방 생성
        let createdChat = await chatService.createChat(socket.uid, title, desc);
        let chat = await chatService.getChat(createdChat._id);
        console.log('createChat data=>', createdChat._id, 'time=>', new Date().toLocaleString());

        io.emit('newChat', chat);

        fn(chat);
      } catch (err) {
        socket.emit('error', { type: 'CREATE_CHAT_FAILURE', message: err.message });
      }
    });

    socket.on('leaveChat', async (chatId, fn) => {
      try {
        // 존재하고 있는 채팅방인지 확인
        await chatService.getChat(chatId);

        let leavedChat = await chatService.leaveChat(socket.uid, chatId);
        console.log('leaveChat data=>', leavedChat._id, 'time=>', new Date().toLocaleString());
        fn(leavedChat);

        // 채팅방에 아무도 존재하지 않는다면 삭제
        if (leavedChat.members.length === 0) {
          console.log('deleteChat');
          try {
            await chatService.deleteChat(chatId);
            console.log('deleteChat data=>', chatId, 'time=>', new Date().toLocaleString());
            return io.emit('deleteChat', chatId);
          } catch (err) {
            console.log(err);
          }
        }

        let statusMessage = await messageService.saveMessage(socket.uid, chatId, { content: '님이 나가셨습니다.', statusMessage: true });

        io.to(chatId).emit('newMessage', statusMessage);
      } catch (err) {
        socket.emit('error', { type: 'LEAVE_CHAT_FAILURE', message: err.message });
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
