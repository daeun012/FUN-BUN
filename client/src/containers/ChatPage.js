import { connect } from 'react-redux';
import { getAllChat, getMyChat, getActiveChat } from '../actions/chat-actions';
import { socketConnect, umountChat, mountChat, sendMessage, joinChat } from '../actions/socket-actions';
import ChatPage from '../components/ChatPage';
import UserService from '../services/UserService';

const mapStateToProps = (state) => {
  return {
    chat: {
      allChat: state.chat.allChat,
      myChat: state.chat.myChat,
      activeChat: state.chat.activeChat,
    },
    user: {
      ...state.user.userData,
      isMember: UserService.user.isMember(state.user.userData, state.chat.activeChat),
      isCreator: UserService.user.isCreator(state.user.userData, state.chat.activeChat),
    },
    messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
    sendMessage: (content) => {
      return dispatch(sendMessage(content));
    },
    joinChat: (chatId) => {
      return dispatch(joinChat(chatId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
