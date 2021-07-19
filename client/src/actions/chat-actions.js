import * as types from '../constants/chat-constants';
import axios from 'axios';
import AuthService from '../services/AuthService';

const Auth = new AuthService();

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

export function getMyChat() {
  return (dispatch) => {
    const uid = Auth.getConfirm()['id'];
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