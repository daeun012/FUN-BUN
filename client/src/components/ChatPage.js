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
        const { chatId, matchId } = match.params;
        if (chatId) {
          getActiveChat(chatId);
          mountChat(chatId);
        } else if (matchId) {
          getActiveChat(matchId);
          mountChat(matchId);
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
      getActiveChat({ chatId: params.chatId });
      umountChat(prevParams.chatId);
      mountChat(params.chatId);
    } else if (params.matchId && prevParams.matchId !== params.matchId) {
      getActiveChat({ matchId: params.matchId });
      umountChat(prevParams.matchId);
      mountChat(params.matchId);
    }
  }

  render() {
    const { chat, user, messages, logoutRequest, randomMatch, sendMessage, joinChat, createChat, leaveChat, isStatus } = this.props;

    return (
      <React.Fragment>
        <ChatHeader handleSideBar={this.handleSideBarToggle} handleMemberDrawer={this.handleMemberDrawerToggle} activeChat={chat.activeChat} user={user} leaveChat={leaveChat} />
        <Sidebar
          isConnected={isStatus.socket === 'SUCCESS'}
          handleSideBar={this.handleSideBarToggle}
          logoutRequest={logoutRequest}
          open={this.state.sideBarOpen}
          chat={chat}
          user={user}
          onRandomMatchClick={() => randomMatch(user.grade, user.dept)}
          createChat={createChat}
        />
        <Chat activeChat={chat.activeChat} messages={messages} user={user} sendMessage={sendMessage} joinChat={joinChat}></Chat>
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
  randomMatch: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  joinChat: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    allChat: PropTypes.instanceOf(Array).isRequired,
    myChat: PropTypes.instanceOf(Array).isRequired,
    activeChat: PropTypes.instanceOf(Object),
    matchChat: PropTypes.instanceOf(Object),
  }).isRequired,
  user: PropTypes.shape({
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
  }).isRequired,
  messages: PropTypes.array.isRequired,
};
export default withSnackbar(ChatPage);
