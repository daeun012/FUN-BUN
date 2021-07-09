import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  login: {
    status: 'INIT',
  },
  register: {
    status: 'INIT',
  },
  status: {
    isLoggedIn: false,
    user: '',
  },
};

export default function user(state = initialState, { type, payload }) {
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
          user: { $set: payload.user },
        },
      });
    case types.USER_LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
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
        },
      });
    default:
      return state;
  }
}
