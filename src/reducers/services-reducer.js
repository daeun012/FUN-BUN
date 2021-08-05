import { combineReducers } from 'redux';
import update from 'react-addons-update';
import * as types from '../constants';

const initialState = {
  isStatus: {
    login: 'INIT',
    register: 'INIT',
    userData: 'INIT',
    allChat: 'INIT',
    myChat: 'INIT',
    myMatch: 'INIT',
    matchMessages: 'INIT',
    activeChat: 'INIT',
    joinChat: 'INIT',
    createChat: 'INIT',
    leaveChat: 'INIT',
    socket: 'INIT',
  },
  errors: {
    user: null,
    chat: null,
  },
};

export const isStatus = (state = initialState.isStatus, { type, payload }) => {
  switch (type) {
    // WAITING
    case types.USER_LOGIN:
      return update(state, { login: { $set: 'WAITING' } });
    case types.USER_REGISTER:
      return update(state, { register: { $set: 'WAITING' } });
    case types.GET_USER_DATA:
      return update(state, { userData: { $set: 'WAITING' } });

    case types.GET_ALL_CHAT:
      return update(state, { allChat: { $set: 'WAITING' } });
    case types.GET_MY_CHAT:
      return update(state, { myChat: { $set: 'WAITING' }, myMatch: { $set: 'WAITING' }, matchMessages: { $set: 'WAITING' } });
    case types.GET_ACTIVE_CHAT:
      return update(state, { activeChat: { $set: 'WAITING' }, activeMessages: { $set: 'WAITING' } });

    case types.SOCKET_CONNECTION:
      return update(state, { socket: { $set: 'WAITING' } });
    case types.JOIN_CHAT:
      return update(state, { joinChat: { $set: 'WAITING' } });
    case types.CREATE_CHAT:
      return update(state, { createChat: { $set: 'WAITING' } });
    case types.LEAVE_CHAT:
      return update(state, { leaveChat: { $set: 'WAITING' } });

    // SUCCESS
    case types.USER_LOGIN_SUCCESS:
      return update(state, { login: { $set: 'SUCCESS' } });
    case types.USER_REGISTER_SUCCESS:
      return update(state, { register: { $set: 'SUCCESS' } });
    case types.GET_USER_DATA_SUCCESS:
      return update(state, { userData: { $set: 'SUCCESS' } });

    case types.GET_ALL_CHAT_SUCCESS:
      return update(state, { allChat: { $set: 'SUCCESS' } });
    case types.GET_MY_CHAT_SUCCESS:
      return update(state, { myChat: { $set: 'SUCCESS' }, myMatch: { $set: 'SUCCESS' }, matchMessages: { $set: 'SUCCESS' } });
    case types.GET_ACTIVE_CHAT_SUCCESS:
      return update(state, { activeChat: { $set: 'SUCCESS' }, activeMessages: { $set: 'SUCCESS' } });

    case types.SOCKET_CONNECTION_SUCCESS:
      return update(state, { socket: { $set: 'SUCCESS' } });
    case types.JOIN_CHAT_SUCCESS:
      return update(state, { joinChat: { $set: 'SUCCESS' } });
    case types.CREATE_CHAT_SUCCESS:
      return update(state, { createChat: { $set: 'SUCCESS' } });
    case types.LEAVE_CHAT_SUCCESS:
      return update(state, { leaveChat: { $set: 'SUCCESS' } });

    // FAILURE
    case types.USER_LOGIN_FAILURE:
      return update(state, { login: { $set: 'FAILURE' } });
    case types.USER_REGISTER_FAILURE:
      return update(state, { register: { $set: 'FAILURE' } });
    case types.GET_USER_DATA_FAILURE:
      return update(state, { userData: { $set: 'FAILURE' } });

    case types.GET_ALL_CHAT_FAILURE:
      return update(state, { allChat: { $set: 'FAILURE' } });
    case types.GET_MY_CHAT_FAILURE:
      return update(state, { myChat: { $set: 'FAILURE' }, myMatch: { $set: 'FAILURE' }, matchMessages: { $set: 'FAILURE' } });
    case types.GET_ACTIVE_CHAT_FAILURE:
      return update(state, { activeChat: { $set: 'FAILURE' }, activeMessages: { $set: 'FAILURE' } });

    case types.SOCKET_CONNECTION_FAILURE:
      return update(state, { socket: { $set: 'FAILURE' } });
    case types.JOIN_CHAT_FAILURE:
      return update(state, { joinChat: { $set: 'FAILURE' } });
    case types.CREATE_CHAT_FAILURE:
      return update(state, { createChat: { $set: 'FAILURE' } });
    case types.LEAVE_CHAT_FAILURE:
      return update(state, { leaveChat: { $set: 'FAILURE' } });

    default:
      return state;
  }
};

export const errors = (state = initialState.errors, { type, payload }) => {
  switch (type) {
    case types.USER_LOGIN_FAILURE:
    case types.USER_REGISTER_FAILURE:
    case types.GET_USER_DATA_FAILURE:
      return update(state, { user: { $set: payload.error } });

    case types.USER_LOGIN:
    case types.USER_REGISTER:
    case types.GET_USER_DATA:
      return update(state, { user: { $set: null } });

    case types.GET_ALL_CHAT_FAILURE:
    case types.GET_MY_CHAT_FAILURE:
    case types.GET_ACTIVE_CHAT_FAILURE:
    case types.SOCKET_CONNECTION_FAILURE:
    case types.JOIN_CHAT_FAILURE:
    case types.CREATE_CHAT_FAILURE:
    case types.LEAVE_CHAT_FAILURE:
      return update(state, { chat: { $set: payload.error } });

    case types.GET_ALL_CHAT:
    case types.GET_MY_CHAT:
    case types.GET_ACTIVE_CHAT:
    case types.SOCKET_CONNECTION:
    case types.JOIN_CHAT:
    case types.CREATE_CHAT:
    case types.LEAVE_CHAT:
      return update(state, { user: { $set: null } });
    default:
      return state;
  }
};

export default combineReducers({
  isStatus,
  errors,
});
