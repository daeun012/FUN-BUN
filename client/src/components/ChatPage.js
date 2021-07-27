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
    this.state = {
      sideBarOpen: false,
    };
    this.Auth = new AuthService();
  }

  handleSideBarToggle = () => {
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  };

  componentDidMount() {
    const { match, getAllChat, getMyChat, socketConnect, getActiveChat, mountChat } = this.props;
    Promise.all([getAllChat(), getMyChat(this.Auth.getConfirm()['id'])])
      .then(() => {
        socketConnect(this.Auth.getToken());
      })
      .then(() => {
        const { chatId } = match.params;
        if (chatId) {
          getActiveChat(chatId);
          mountChat(chatId);
        }
      });
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params },
      getActiveChat,
      umountChat,
      mountChat,
    } = this.props;
    const { params: prevParams } = prevProps.match;

    if (prevParams.chatId !== params.chatId) {
      console.log('componentDidUpdate');
      getActiveChat(params.chatId);
      umountChat(prevParams.chatId);
      mountChat(params.chatId);
    }
  }

  render() {
    const { chat, user, messages, sendMessage, joinChat, createChat } = this.props;

    return (
      <React.Fragment>
        <ChatHeader handleSideBar={this.handleSideBarToggle} />
        <Sidebar chat={chat} handleSideBar={this.handleSideBarToggle} open={this.state.sideBarOpen} createChat={createChat} />
        <Chat activeChat={chat.activeChat} messages={messages} user={user} sendMessage={sendMessage} joinChat={joinChat}></Chat>
      </React.Fragment>
    );
  }
}
ChatPage.propTypes = {
  getMyChat: PropTypes.func.isRequired,
  getAllChat: PropTypes.func.isRequired,
  getActiveChat: PropTypes.func.isRequired,
  umountChat: PropTypes.func.isRequired,
  mountChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  joinChat: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
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
