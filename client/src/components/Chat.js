import React from 'react';
import PropTypes from 'prop-types';
import ChatMessageList from './ChatMessageList';
import MessageInput from './MessageInput';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  chatLayout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
  },
});
const Chat = ({ classes, activeChat, messages, user, sendMessage, joinChat }) => (
  <main className={classes.chatLayout}>
    <ChatMessageList activeChat={activeChat} messages={messages} user={user}></ChatMessageList>
    {activeChat && <MessageInput showJoinButton={!user.isMember} sendMessage={sendMessage} onJoinButtonClick={() => joinChat(activeChat._id)}></MessageInput>}
  </main>
);

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  joinChat: PropTypes.func.isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
  }).isRequired,
  messages: PropTypes.array.isRequired,
};

export default withStyles(styles)(Chat);
