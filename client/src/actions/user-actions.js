import * as types from '../constants/user-constants';
import axios from 'axios';
import AuthService from '../services/AuthService';

const Auth = new AuthService();

/* LOGIN */
export function loginRequest(userId, password) {
  return (dispatch) => {
    dispatch({ type: types.USER_LOGIN });
    return axios
      .post('/users/login', { userId: userId, password: password })
      .then((res) => {
        Auth.setToken(res.data['token']);
        dispatch({ type: types.USER_LOGIN_SUCCESS });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: types.USER_LOGIN_FAILURE, payload: { error: err.response.data['message'] } });
      });
  };
}

/* REGISTER */
export function registerRequest(data) {
  return (dispatch) => {
    dispatch({ type: types.USER_REGISTER });
    return axios
      .post('/users/register', data)
      .then((res) => {
        InfoToast.custom.info('인증 메일을 전송했습니다.', 3000);
        dispatch({ type: types.USER_REGISTER_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: types.USER_REGISTER_FAILURE, payload: { error: err.response.data['error'] } });
      });
  };
}

/* GET USER DATA */
export function getUserDataRequest(uid) {
  return (dispatch) => {
    dispatch({ type: types.GET_USER_DATA });
    return axios
      .get(`/users/data/${uid}`)
      .then((res) => {
        dispatch({ type: types.GET_USER_DATA_SUCCESS, payload: { user: res.data['user'] } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: types.GET_USER_DATA_FAILURE, payload: { error: err.response.data['message'] } });
      });
  };
}
