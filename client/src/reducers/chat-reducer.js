import * as types from '../constants/chat-constants';
import update from 'react-addons-update';

const initialState = {
  allChat: {
    status: 'INIT',
    data: [],
    error: '',
  },
  myChat: {
    status: 'INIT',
    data: [],
    error: '',
  },
  activeChat: {
    status: 'INIT',
    data: {},
    error: '',
  },
};

export default function chat(state = initialState, { type, payload }) {
  switch (type) {
    /* GET ALL CHAT */
    case types.GET_ALL_CHAT:
      return update(state, {
        allChat: {
          status: { $set: 'WAITING' },
        },
      });
    case types.GET_ALL_CHAT_SUCCESS:
      return update(state, {
        allChat: {
          status: { $set: 'SUCCESS' },
          data: { $set: payload.allChat },
        },
      });
    case types.GET_ALL_CHAT_FAILURE:
      return update(state, {
        allChat: {
          status: { $set: 'FAILURE' },
          error: { $set: payload.error },
        },
      });

    /* GET MY CHAT */
    case types.GET_MY_CHAT:
      return update(state, {
        myChat: {
          status: { $set: 'WAITING' },
        },
      });
    case types.GET_MY_CHAT_SUCCESS:
      return update(state, {
        myChat: {
          status: { $set: 'SUCCESS' },
          data: { $set: payload.myChat },
        },
      });
    case types.GET_MY_CHAT_FAILURE:
      return update(state, {
        myChat: {
          status: { $set: 'FAILURE' },
          error: { $set: payload.error },
        },
      });

    /* GET ACTIVE CHAT */
    case types.GET_ACTIVE_CHAT:
      return update(state, {
        activeChat: {
          status: { $set: 'WAITING' },
        },
      });
    case types.GET_ACTIVE_CHAT_SUCCESS:
      return update(state, {
        activeChat: {
          status: { $set: 'SUCCESS' },
          data: { $set: payload.activeChat },
        },
      });
    case types.GET_ACTIVE_CHAT_FAILURE:
      return update(state, {
        activeChat: {
          status: { $set: 'FAILURE' },
          error: { $set: payload.error },
        },
      });

    default:
      return state;
  }
}
