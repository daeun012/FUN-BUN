import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ChatMessage from './ChatMessage';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  welcomWarapper: { height: '100%' },
  joinWarapper: { height: 'calc(100% - 40px)' },
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
    const { classes, match, messages, user, activeChat } = this.props;

    if (!match.params.chatId) {
      return (
        <Grid className={classes.welcomWarapper} container justifyContent="center" alignItems="center">
          <Paper className={classes.paper}>
            <Typography>FUN & BUN</Typography>
          </Paper>
        </Grid>
      );
    } else {
      return activeChat ? (
        user.isMember ? (
          <div className={classes.messageWrapper}>
            {messages.map((message) => {
              return <ChatMessage key={message._id} user={user} {...message} />;
            })}
          </div>
        ) : (
          <Grid className={classes.joinWarapper} container alignItems="center" justifyContent="center" direction="column">
            <Typography variant="h4">{activeChat.title}</Typography>
            <Typography variant="overline">
              {activeChat.members.length}명 / 개설일 {moment(activeChat.createdAt).format('YYYY.MM.DD')}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              {activeChat.description}
            </Typography>
          </Grid>
        )
      ) : (
        <Grid className={classes.joinWarapper} container alignItems="center" justifyContent="center" direction="column">
          <CircularProgress />
        </Grid>
      );
    }
  }
}

ChatMessageList.propTypes = {
  activeChat: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    members: PropTypes.array,
    createdAt: PropTypes.string,
  }),
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
