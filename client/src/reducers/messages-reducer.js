import * as types from '../constants';

import update from 'react-addons-update';

const initialState = [];

export default function messages(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_ACTIVE_CHAT_SUCCESS:
      return update(state, { $set: payload.messages });
    case types.RECIEVE_MESSAGE:
      return update(state, { $push: [payload.message] });
    default:
      return state;
  }
}
