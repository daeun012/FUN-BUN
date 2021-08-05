import * as types from '../constants/user-constants';
import update from 'react-addons-update';

const initialState = {
  isLoggedIn: false,
  userData: '',
};

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case types.USER_LOGIN_SUCCESS:
    case types.GET_USER_DATA:
      return update(state, { isLoggedIn: { $set: true } });

    case types.GET_USER_DATA_SUCCESS:
      return update(state, { userData: { $set: payload.user } });
    case types.GET_USER_DATA_FAILURE:
      return update(state, { isLoggedIn: { $set: false } });

    case types.USER_LOGOUT:
      return update(state, {
        isLoggedIn: { $set: false },
        userData: { $set: '' },
      });
    default:
      return state;
  }
}
