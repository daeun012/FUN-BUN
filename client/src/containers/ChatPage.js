import { connect } from 'react-redux';
import { logoutRequest } from '../actions/user-actions';
import { getAllChat, getMyChat, getActiveChat } from '../actions/chat-actions';
import { socketConnect, umountChat, mountChat, randomMatch, sendMessage, joinChat, createChat, leaveChat } from '../actions/socket-actions';
import ChatPage from '../components/ChatPage';
import UserService from '../services/UserService';

const mapStateToProps = (state) => {
  return {
    chat: {
      allChat: state.chat.allChat,
      myChat: state.chat.myChat,
      activeChat: state.chat.activeChat,
      matchChat: state.chat.matchChat,
    },
    user: {
      ...state.user.userData,
      isMember: UserService.user.isMember(state.user.userData, state.chat.activeChat),
      isCreator: UserService.user.isCreator(state.user.userData, state.chat.activeChat),
    },
    messages: state.messages,
    isStatus: state.services.isStatus,
    errors: state.services.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
    getAllChat: () => {
      return dispatch(getAllChat());
    },
    getMyChat: (uid) => {
      return dispatch(getMyChat(uid));
    },
    getActiveChat: (chatId) => {
      return dispatch(getActiveChat(chatId));
    },
    socketConnect: (token) => {
      return dispatch(socketConnect(token));
    },
    umountChat: (chatId) => {
      return dispatch(umountChat(chatId));
    },
    mountChat: (chatId) => {
      return dispatch(mountChat(chatId));
    },
    randomMatch: (grade, dept) => {
      return dispatch(randomMatch(grade, dept));
    },
    sendMessage: (content) => {
      return dispatch(sendMessage(content));
    },
    joinChat: (chatId) => {
      return dispatch(joinChat(chatId));
    },
    createChat: (title, desc) => {
      return dispatch(createChat(title, desc));
    },
    leaveChat: (chatId) => {
      return dispatch(leaveChat(chatId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
