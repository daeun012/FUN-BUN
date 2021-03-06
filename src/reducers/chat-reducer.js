import * as types from '../constants';
import update from 'react-addons-update';
import { combineReducers } from 'redux';

const initialState = {
  allChat: [],
  myChat: [],
  myMatch: null,
  activeChat: null,
};

const allChat = (state = initialState.allChat, { type, payload }) => {
  switch (type) {
    case types.GET_ALL_CHAT_SUCCESS:
      return update(state, { $set: payload.allChat });
    case types.RECIEVE_NEW_CHAT:
      return update(state, { $push: [payload.chat] });
    case types.RECIEVE_DELETE_CHAT:
      return update(state, { $splice: [[state.findIndex((chat) => chat._id === payload.chatId), 1]] });

    default:
      return state;
  }
};

const myChat = (state = initialState.myChat, { type, payload }) => {
  switch (type) {
    case types.GET_MY_CHAT_SUCCESS:
      return update(state, { $set: payload.myChat });
    case types.JOIN_CHAT_SUCCESS:
    case types.CREATE_CHAT_SUCCESS:
      return update(state, { $push: [payload.chat] });
    case types.LEAVE_CHAT_SUCCESS:
      return update(state, { $splice: [[state.findIndex((chat) => chat._id === payload.chat._id), 1]] });
    default:
      return state;
  }
};

const myMatch = (state = initialState.myMatch, { type, payload }) => {
  switch (type) {
    case types.GET_MY_CHAT_SUCCESS:
      return update(state, { $set: payload.myMatch });
    case types.RANDOM_MATCH_SUCCESS:
      return update(state, { $set: payload.match });
    case types.RECIEVE_UPDATE_MATCH_INFO:
      return update(state, { members: { $set: payload.members } });
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
    case types.RECIEVE_UPDATE_CHAT_INFO:
      return update(state, { members: { $set: payload.members } });
    case types.LEAVE_CHAT_SUCCESS:
      return update(state, { $set: null });
    default:
      return state;
  }
};

export default combineReducers({
  allChat,
  myChat,
  activeChat,
  myMatch,
});
