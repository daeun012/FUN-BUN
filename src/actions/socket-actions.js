import * as types from '../constants/socket-constants';
import io from 'socket.io-client';
import history from '../utils/history';

let socket = null;

export function socketConnect(token) {
  return (dispatch) => {
    dispatch({ type: types.SOCKET_CONNECTION });

    socket = io('ws://localhost:3000', { query: { token } });
    socket.on('connect', () => {
      dispatch({ type: types.SOCKET_CONNECTION_SUCCESS });
    });
    socket.on('connect_error', (error) => {
      dispatch({ type: types.SOCKET_CONNECTION_FAILURE, payload: { error: error.message } });
    });

    socket.on('error', (error) => {
      dispatch({ type: types[error.type], payload: { error: error.message } });
    });

    socket.on('newMessage', (message, data) => {
      console.log('hi');
      console.log(message, data);
      if (data.tip === 'joinChat') {
        dispatch({ type: types.RECIEVE_UPDATE_CHAT_INFO, payload: { members: data.members } });
        dispatch({ type: types.RECIEVE_ACTIVE_MESSAGE, payload: { message } });
      } else if (data.tip === 'leaveChat') {
        dispatch({ type: types.RECIEVE_UPDATE_CHAT_INFO, payload: { members: data.members } });
        dispatch({ type: types.RECIEVE_ACTIVE_MESSAGE, payload: { message } });
      } else if (data.tip === 'sendChatMsg') {
        dispatch({ type: types.RECIEVE_ACTIVE_MESSAGE, payload: { message } });
      } else if (data.tip === 'randomMatch') {
        dispatch({ type: types.RECIEVE_UPDATE_MATCH_INFO, payload: { members: data.members } });
        dispatch({ type: types.RECIEVE_MATCH_MESSAGE, payload: { message } });
      } else if (data.tip === 'sendMatchMsg') {
        console.log('sendMatchMsg');
        dispatch({ type: types.RECIEVE_MATCH_MESSAGE, payload: { message } });
      }
    });
    socket.on('newChat', (chat) => {
      dispatch({ type: types.RECIEVE_NEW_CHAT, payload: { chat } });
    });
    socket.on('deleteChat', (chatId) => {
      dispatch({ type: types.RECIEVE_DELETE_CHAT, payload: { chatId } });
    });
  };
}

export function randomMatch(grade, dept) {
  return (dispatch) => {
    dispatch({ type: types.RANDOM_MATCH });
    socket.emit('randomMatch', grade, dept, (match) => {
      try {
        dispatch({ type: types.RANDOM_MATCH_SUCCESS, payload: { match } });
        history.push(`/match/${match._id}`);
      } catch (err) {
        dispatch({ type: types.RANDOM_MATCH_FAILURE, payload: { error: err.message } });
      }
    });
  };
}

export function joinChat(chatId) {
  return (dispatch) => {
    dispatch({ type: types.JOIN_CHAT });
    socket.emit('joinChat', chatId, (chat) => {
      try {
        dispatch({ type: types.JOIN_CHAT_SUCCESS, payload: { chat } });
        history.push(`/chat/${chat._id}`);
      } catch (err) {
        dispatch({ type: types.JOIN_CHAT_FAILURE, payload: { error: err.message } });
      }
    });
  };
}

export function createChat(title, desc) {
  return (dispatch) => {
    dispatch({ type: types.CREATE_CHAT });
    socket.emit('createChat', title, desc, (chat) => {
      try {
        dispatch({ type: types.CREATE_CHAT_SUCCESS, payload: { chat } });
        history.push(`/chat/${chat._id}`);
      } catch (err) {
        dispatch({ type: types.CREATE_CHAT_FAILURE, payload: { error: err.message } });
      }
    });
  };
}

export function leaveChat(chatId) {
  return (dispatch) => {
    dispatch({ type: types.LEAVE_CHAT });
    socket.emit('leaveChat', chatId, (chat) => {
      try {
        dispatch({ type: types.LEAVE_CHAT_SUCCESS, payload: { chat } });
        history.push('/');
      } catch (err) {
        dispatch({ type: types.LEAVE_CHAT_FAILURE, payload: { error: err.message } });
      }
    });
  };
}

export function sendChatMsg(content) {
  return (dispatch, getState) => {
    const activeChatId = getState().chat.activeChat._id;
    socket.emit(
      'sendChatMsg',
      {
        chatId: activeChatId,
        content,
      },
      (message) => {
        dispatch({
          type: types.SEND_CHAT_MESSAGE,
          payload: { chatId: activeChatId, message },
        });
      }
    );
  };
}

export function sendMatchMsg(content) {
  return (dispatch, getState) => {
    const myMatchId = getState().chat.myMatch._id;
    socket.emit(
      'sendMatchMsg',
      {
        matchId: myMatchId,
        content,
      },
      (message) => {
        dispatch({
          type: types.SEND_MATCH_MESSAGE,
          payload: { matchId: myMatchId, message },
        });
      }
    );
  };
}

export function umountChat(chatId) {
  return (dispatch) => {
    socket.emit('umountChat', chatId);
    dispatch({
      type: types.UMOUNT_CHAT,
      payload: { chatId },
    });
  };
}

export function mountChat(chatId) {
  return (dispatch) => {
    socket.emit('mountChat', chatId);
    dispatch({
      type: types.MOUNT_CHAT,
      payload: { chatId },
    });
  };
}
