import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import ChatMessage from './ChatMessage';

const styles = (theme) => ({
  messageWrapper: {
    overflowY: 'scroll',
    height: 'calc(100% - 75px)',
    paddingTop: theme.spacing(3),
    paddingBottom: '50px',
  },
  paper: {
    padding: theme.spacing(3),
  },
});

class ChatMessageList extends Component {
  render() {
    const { classes, match, user, messages } = this.props;

    if (!match.params.chatId) {
      return 'not selected';
    } else if (user.isMember || user.isCreator) {
      return (
        <div className={classes.messageWrapper}>
          {messages.map((message) => {
            return <ChatMessage key={message._id} user={user} {...message} />;
          })}
        </div>
      );
    } else {
      return 'please join';
    }
  }
}

ChatMessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      sender: PropTypes.instanceOf(Object).isRequired,
      chatId: PropTypes.string.isRequired,
      statusMessage: PropTypes.bool,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withRouter(withStyles(styles)(ChatMessageList));
