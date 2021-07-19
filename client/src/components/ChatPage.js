import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader';
import Sidebar from './Sidebar';
/* import Chat from './Chat'; */

class ChatPage extends Component {
  componentDidMount() {
    const { getAllChat, getMyChat } = this.props;
    getAllChat();
    getMyChat();
  }
  render() {
    const { chat } = this.props;
    return (
      <React.Fragment>
        <ChatHeader />
        <Sidebar chat={chat} />
      </React.Fragment>
    );
  }
}
ChatPage.propTypes = {
  getMyChat: PropTypes.func.isRequired,
  getAllChat: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    allChat: PropTypes.object.isRequired,
    myChat: PropTypes.object.isRequired,
  }).isRequired,
};

export default ChatPage;
