import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
const styles = (theme) => ({
  welcomWarapper: { height: '100%' },
  paper: {
    padding: theme.spacing(3),
  },
  messageWrapper: {
    overflowY: 'scroll',
    height: 'calc(100% - 75px)',
    paddingTop: theme.spacing(3),
    paddingBottom: '50px',
  },
});

class ChatMessageList extends Component {
  render() {
    const { classes, match, user, messages } = this.props;

    if (!match.params.chatId) {
      return (
        <Grid className={classes.welcomWarapper} container justifyContent="center" alignItems="center">
          <Paper className={classes.paper}>
            <Typography>FUN & BUN</Typography>
          </Paper>
        </Grid>
      );
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
