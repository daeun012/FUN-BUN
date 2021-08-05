import * as types from '../constants';
import update from 'react-addons-update';
import { combineReducers } from 'redux';

const initialState = {
  activeMessages: [],
  matchMessages: [],
};

const activeMessages = (state = initialState.activeMessages, { type, payload }) => {
  switch (type) {
    case types.GET_ACTIVE_CHAT_SUCCESS:
      return update(state, { $set: payload.activeMessages });
    case types.RECIEVE_ACTIVE_MESSAGE:
      return update(state, { $push: [payload.message] });
    default:
      return state;
  }
};

const matchMessages = (state = initialState.matchMessages, { type, payload }) => {
  switch (type) {
    case types.GET_MY_CHAT_SUCCESS:
      return update(state, { $set: payload.matchMessages });
    case types.RECIEVE_MATCH_MESSAGE:
      return update(state, { $push: [payload.message] });
    default:
      return state;
  }
};

export default combineReducers({
  activeMessages,
  matchMessages,
});
