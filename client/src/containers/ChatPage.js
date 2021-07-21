import { connect } from 'react-redux';
import { getAllChat, getMyChat, getActiveChat } from '../actions/chat-actions';
import { socketConnect, leaveChat, joinChat, sendMessage } from '../actions/socket-actions';
import ChatPage from '../components/ChatPage';
import UserService from '../services/UserService';

const mapStateToProps = (state) => {
  return {
    chat: {
      allChat: state.chat.allChat.data,
      myChat: state.chat.myChat.data,
      activeChat: state.chat.activeChat.data,
    },
    user: {
      ...state.auth.status.user,
      isMember: UserService.user.isMember(state.auth.status.user, state.chat.activeChat.data),
      isCreator: UserService.user.isCreator(state.auth.status.user, state.chat.activeChat.data),
    },
    messages: state.messages.data,
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
    leaveChat: (chatId) => {
      return dispatch(leaveChat(chatId));
    },
    joinChat: (chatId) => {
      return dispatch(joinChat(chatId));
    },
    sendMessage: (content) => {
      return dispatch(sendMessage(content));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
