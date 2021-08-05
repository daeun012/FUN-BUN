import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader';
import Sidebar from './Sidebar';
import Chat from './Chat';
import ChatInfo from './ChatInfo';
import AuthService from '../services/AuthService';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarOpen: false,
      chatInfoOpen: false,
    };
    this.Auth = new AuthService();
  }

  handleSideBarToggle = () => {
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  };
  handleChatInfoToggle = () => {
    this.setState({ chatInfoOpen: !this.state.chatInfoOpen });
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
          getActiveChat({ chatId });
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

    if (params.chatId && prevParams.chatId !== params.chatId) {
      getActiveChat(params.chatId);
      umountChat(prevParams.chatId);
      mountChat(params.chatId);
    }
  }

  render() {
    const { chat, user, messages, logoutRequest, joinChat, createChat, leaveChat, sendChatMsg, randomMatch, sendMatchMsg, isStatus } = this.props;

    return (
      <React.Fragment>
        <ChatHeader handleSideBar={this.handleSideBarToggle} handleChatInfo={this.handleChatInfoToggle} leaveChat={leaveChat} activeChat={chat.activeChat} myMatch={chat.myMatch} user={user} />
        <Sidebar
          isConnected={isStatus.socket === 'SUCCESS'}
          handleSideBar={this.handleSideBarToggle}
          open={this.state.sideBarOpen}
          logoutRequest={logoutRequest}
          createChat={createChat}
          chat={chat}
          user={user}
        />
        <Chat
          joinChat={joinChat}
          sendChatMsg={sendChatMsg}
          randomMatch={randomMatch}
          sendMatchMsg={sendMatchMsg}
          activeChat={chat.activeChat}
          activeMessages={messages.activeMessages}
          matchMessages={messages.matchMessages}
          user={user}
        ></Chat>
        <ChatInfo handleChatInfo={this.handleChatInfoToggle} open={this.state.chatInfoOpen} activeChat={chat.activeChat} myMatch={chat.myMatch}></ChatInfo>
      </React.Fragment>
    );
  }
}
ChatPage.propTypes = {
  getAllChat: PropTypes.func.isRequired,
  getMyChat: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  socketConnect: PropTypes.func.isRequired,
  getActiveChat: PropTypes.func.isRequired,
  umountChat: PropTypes.func.isRequired,
  mountChat: PropTypes.func.isRequired,
  joinChat: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
  sendChatMsg: PropTypes.func.isRequired,
  randomMatch: PropTypes.func.isRequired,
  sendMatchMsg: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    allChat: PropTypes.instanceOf(Array).isRequired,
    myChat: PropTypes.instanceOf(Array).isRequired,
    activeChat: PropTypes.instanceOf(Object),
    myMatch: PropTypes.instanceOf(Object),
  }).isRequired,
  user: PropTypes.shape({
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
  }).isRequired,
  messages: PropTypes.shape({
    activeMessages: PropTypes.array.isRequired,
    matchMessages: PropTypes.array.isRequired,
  }).isRequired,
};
export default withSnackbar(ChatPage);
