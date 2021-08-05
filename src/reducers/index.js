import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import chatReducer from './chat-reducer';
import messagesReducer from './messages-reducer';
import servicesReducer from './services-reducer';
const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  messages: messagesReducer,
  services: servicesReducer,
});

export default rootReducer;
