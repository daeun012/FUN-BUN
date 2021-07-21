import * as types from '../constants/socket-constants';
import io from 'socket.io-client';

let socket;

export function socketConnect(token) {
  return (dispatch) => {
    dispatch({ type: types.SOCKET_CONNECTION });
    console.log('hi');
    socket = io(`http://localhost:3000?token=${token}`);
    socket.on('connect', () => {
      console.log('소켓 연결 성공');
    });
  };
}

export function sendMessage(content) {
  return (dispatch, getState) => {
    const activeChatId = getState().chat.activeChat.data._id;
    socket.emit('sendMessage', {
      chatId: activeChatId,
      content,
    });
  };
}

export function leaveChat(chatId) {
  return (dispatch) => {
    socket.emit('leaveChat', chatId);
    dispatch({
      type: types.LEAVE_CHAT,
      payload: { chatId },
    });
  };
}

export function joinChat(chatId) {
  return (dispatch) => {
    socket.emit('joinChat', chatId);
    dispatch({
      type: types.JOIN_CHAT,
      payload: { chatId },
    });
  };
}
