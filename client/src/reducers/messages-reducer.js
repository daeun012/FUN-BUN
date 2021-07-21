import * as types from '../constants/chat-constants';
import update from 'react-addons-update';

const initialState = {
  status: 'INIT',
  data: [],
  error: '',
};

export default function messages(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_ACTIVE_CHAT:
      return update(state, {
        status: { $set: 'WAITING' },
      });
    case types.GET_ACTIVE_CHAT_SUCCESS:
      return update(state, {
        status: { $set: 'SUCCESS' },
        data: { $set: payload.messages },
      });
    case types.GET_ACTIVE_CHAT_FAILURE:
      return update(state, {
        status: { $set: 'FAILURE' },
        error: { $set: payload.error },
      });
    default:
      return state;
  }
}
