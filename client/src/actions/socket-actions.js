import * as types from '../constants/socket-constants';
import io from 'socket.io-client';

let socket;

export function socketConnect(token) {
  return (dispatch) => {
    dispatch({ type: types.SOCKET_CONNECTION });

    socket = io(`http://localhost:3000?token=${token}`);
    socket.on('connect', () => {
      dispatch({ type: types.SOCKET_CONNECTION_SUCCESS });
    });
    socket.on('connect_error', (error) => {
      console.log(error);
      dispatch({ type: types.SOCKET_CONNECTION_FAILURE, payload: { error: error.message } });
    });

    socket.on('error', (error) => {
      dispatch({ type: types[error.type], payload: { error: error.message } });
    });

    socket.on('newMessage', (message) => {
      dispatch({ type: types.RECIEVE_MESSAGE, payload: { message } });
    });
  };
}

export function joinChat(chatId) {
  return (dispatch) => {
    dispatch({ type: types.JOIN_CHAT });
    socket.emit('joinChat', chatId, (chat) => {
      try {
        console.log(chat);
        dispatch({ type: types.JOIN_CHAT_SUCCESS, payload: { chat } });
      } catch (err) {
        dispatch({ type: types.JOIN_CHAT_FAILURE, payload: { error: error.message } });
      }
    });
  };
}

export function sendMessage(content) {
  return (dispatch, getState) => {
    const activeChatId = getState().chat.activeChat._id;
    socket.emit(
      'sendMessage',
      {
        chatId: activeChatId,
        content,
      },
      (message) => {
        dispatch({
          type: types.SEND_MESSAGE,
          payload: { chatId: activeChatId, message },
        });
      }
    );
  };
}

export function umountChat(chatId) {
  return (dispatch) => {
    socket.emit('umountChat', chatId);
    dispatch({
      type: types.LEAVE_CHAT,
      payload: { chatId },
    });
  };
}

export function mountChat(chatId) {
  return (dispatch) => {
    socket.emit('mountChat', chatId);
    dispatch({
      type: types.JOIN_CHAT,
      payload: { chatId },
    });
  };
}
