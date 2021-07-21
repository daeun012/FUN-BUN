import React from 'react';
import PropTypes from 'prop-types';
import ChatMessageList from './ChatMessageList';
import MessageInput from './MessageInput';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  chatLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    heigth: '100%',
    width: '100%',
    overflow: 'hidden',
  },
});
const Chat = ({ classes, user, messages, sendMessage }) => (
  <main className={classes.chatLayout}>
    <div>
      <ChatMessageList user={user} messages={messages}></ChatMessageList>
      <MessageInput sendMessage={sendMessage}></MessageInput>
    </div>
  </main>
);

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  activeChat: PropTypes.object.isRequired,
  user: PropTypes.shape({
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
  }).isRequired,
  messages: PropTypes.array.isRequired,
};

export default withStyles(styles)(Chat);
