import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import chatReducer from './chat-reducer';
import messagesReducer from './messages-reducer';
const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  messages: messagesReducer,
});

export default rootReducer;
