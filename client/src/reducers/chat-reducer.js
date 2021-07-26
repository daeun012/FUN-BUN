import { combineReducers } from 'redux';
import update from 'react-addons-update';
import * as types from '../constants';

const initialState = {
  allChat: [],
  myChat: [],
  activeChat: {},
};

const allChat = (state = initialState.allChat, { type, payload }) => {
  switch (type) {
    case types.GET_ALL_CHAT_SUCCESS:
      return update(state, { $set: payload.allChat });
    default:
      return state;
  }
};

const myChat = (state = initialState.myChat, { type, payload }) => {
  switch (type) {
    case types.GET_MY_CHAT_SUCCESS:
      return update(state, { $set: payload.myChat });
    case types.JOIN_CHAT_SUCCESS:
      return update(state, { $push: [payload.chat] });
    default:
      return state;
  }
};

const activeChat = (state = initialState.activeChat, { type, payload }) => {
  switch (type) {
    case types.GET_ACTIVE_CHAT_SUCCESS:
      return update(state, { $set: payload.activeChat });
    case types.JOIN_CHAT_SUCCESS:
      return update(state, { $set: payload.chat });
    default:
      return state;
  }
};

export default combineReducers({
  allChat,
  myChat,
  activeChat,
});
