import * as types from '../constants/chat-constants';
import axios from 'axios';
import history from '../utils/history';

export function getAllChat() {
  return (dispatch) => {
    dispatch({ type: types.GET_ALL_CHAT });
    return axios
      .get('/chat/allchat')
      .then((res) => {
        dispatch({ type: types.GET_ALL_CHAT_SUCCESS, payload: { allChat: res.data['allChat'] } });
      })
      .catch((err) => {
        dispatch({ type: types.GET_ALL_CHAT_FAILURE, payload: { error: err.response.data['error'] } });
      });
  };
}

export function getMyChat(uid) {
  return (dispatch) => {
    dispatch({ type: types.GET_MY_CHAT });
    return axios
      .get(`/chat/mychat/${uid}`)
      .then((res) => {
        dispatch({ type: types.GET_MY_CHAT_SUCCESS, payload: { myChat: res.data['myChat'] } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: types.GET_MY_CHAT_FAILURE, payload: { error: err.response.data['error'] } });
      });
  };
}

export function getActiveChat(chatId) {
  return (dispatch) => {
    dispatch({ type: types.GET_ACTIVE_CHAT });
    return axios
      .get(`/chat/data/${chatId}`)
      .then((res) => {
        dispatch({ type: types.GET_ACTIVE_CHAT_SUCCESS, payload: { activeChat: res.data['activeChat'], messages: res.data['messages'] } });
        history.push(`/chat/${res.data.activeChat._id}`);
      })
      .catch((err) => {
        dispatch({ type: types.GET_ACTIVE_CHAT_FAILURE, payload: { error: err.response.data['error'] } });
        history.push('/');
      });
  };
}
