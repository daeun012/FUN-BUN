import * as types from '../constants/auth-constants';
import update from 'react-addons-update';

const initialState = {
  login: {
    status: 'INIT',
    error: '',
  },
  register: {
    status: 'INIT',
    error: '',
  },
  status: {
    isLoggedIn: false,
    user: '',
    error: '',
  },
};

export default function auth(state = initialState, { type, payload }) {
  switch (type) {
    /* LOGIN */
    case types.USER_LOGIN:
      return update(state, {
        login: {
          status: { $set: 'WAITING' },
        },
      });
    case types.USER_LOGIN_SUCCESS:
      return update(state, {
        login: {
          status: { $set: 'SUCCESS' },
        },
        status: {
          isLoggedIn: { $set: true },
        },
      });
    case types.USER_LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
          error: { $set: payload.error },
        },
      });

    /* Register */
    case types.USER_REGISTER:
      return update(state, {
        register: {
          status: { $set: 'WAITING' },
        },
      });
    case types.USER_REGISTER_SUCCESS:
      return update(state, {
        register: {
          status: { $set: 'SUCCESS' },
        },
      });
    case types.USER_REGISTER_FAILURE:
      return update(state, {
        register: {
          status: { $set: 'FAILURE' },
          error: { $set: payload.error },
        },
      });

    /* GET STATUS */
    case types.USER_GET_STATUS:
      return update(state, {
        status: {
          isLoggedIn: { $set: true },
        },
      });
    case types.USER_GET_STATUS_SUCCESS:
      return update(state, {
        status: {
          user: { $set: payload.user },
        },
      });
    case types.USER_GET_STATUS_FAILURE:
      return update(state, {
        status: {
          isLoggedIn: { $set: false },
          error: { $set: payload.error },
        },
      });

    default:
      return state;
  }
}
