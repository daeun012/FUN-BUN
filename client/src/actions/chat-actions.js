import * as types from '../constants/chat-constants';
import axios from 'axios';
import history from '../utils/history';

// 모든 채팅 가져오기
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

// 내 채팅 가져오기
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

// 선택한(활동중인) 채팅 데이터 가져오기
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
