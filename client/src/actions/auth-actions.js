import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE } from './ActionTypes';
import axios from 'axios';
import AuthService from '../services/AuthService';
import InfoToast from '../services/toasts/InfoToasts';
import ErrorToast from '../services/toasts/ErrorToasts';

const Auth = new AuthService();

/* LOGIN */
export function loginRequest(userId, password) {
  return (dispatch) => {
    dispatch({ type: USER_LOGIN });
    return axios
      .post('/auth/login', { userId: userId, password: password })
      .then((res) => {
        InfoToast.custom.info(res.data.message, 3000);
        Auth.setToken(res.data['token']);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        ErrorToast.custom.error(err.response.data['message'], 1400);
        dispatch({ type: USER_LOGIN_FAILURE });
      });
  };
}

/* REGISTER */
export function registerRequest(data) {
  return (dispatch) => {
    dispatch({ type: USER_REGISTER });
    return axios
      .post('/auth/register', data)
      .then((res) => {
        InfoToast.custom.info('인증 메일을 전송했습니다.', 3000);
        dispatch({ type: USER_REGISTER_SUCCESS });
      })
      .catch((err) => {
        let message = err.response.data['error'];
        ErrorToast.custom.error(message, 1400);
        dispatch({ type: USER_REGISTER_FAILURE });
      });
  };
}
