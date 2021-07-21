import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader';
import Sidebar from './Sidebar';
import Chat from './Chat';
import AuthService from '../services/AuthService';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }
  componentDidMount() {
    const { match, getAllChat, getMyChat, socketConnect, getActiveChat } = this.props;
    Promise.all([getAllChat(), getMyChat(this.Auth.getConfirm()['id'])])
      .then(() => {
        socketConnect(this.Auth.getToken());
      })
      .then(() => {
        const { chatId } = match.params;
        if (chatId) {
          getActiveChat(chatId);
        }
      });
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params },
      getActiveChat,
      leaveChat,
      joinChat,
    } = this.props;
    const { params: prevParams } = prevProps.match;

    if (prevParams.chatId !== params.chatId) {
      getActiveChat(params.chatId);
      leaveChat(prevParams.chatId);
      joinChat(params.chatId);
    }
  }

  render() {
    const { chat, user, messages, sendMessage } = this.props;
    console.log(messages);
    return (
      <React.Fragment>
        <ChatHeader />
        <Sidebar chat={chat} />
        <Chat activeChat={chat.activeChat} messages={messages} user={user} sendMessage={sendMessage}></Chat>
      </React.Fragment>
    );
  }
}
ChatPage.propTypes = {
  getMyChat: PropTypes.func.isRequired,
  getAllChat: PropTypes.func.isRequired,
  getActiveChat: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
  joinChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    allChat: PropTypes.instanceOf(Array).isRequired,
    myChat: PropTypes.instanceOf(Array).isRequired,
    activeChat: PropTypes.instanceOf(Object).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
  }).isRequired,
  messages: PropTypes.array.isRequired,
};

export default withSnackbar(ChatPage);
