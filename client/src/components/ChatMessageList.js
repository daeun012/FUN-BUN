import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ChatMessage from './ChatMessage';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  welcomWarapper: { height: '90%' },
  joinWarapper: { height: 'calc(100% - 40px)' },
  paper: {
    padding: theme.spacing(3),
  },
  messagesWrapper: {
    overflowY: 'scroll',
    height: 'calc(100% - 75px)',
    paddingTop: theme.spacing(3),
    paddingBottom: '50px',
  },
});

class ChatMessageList extends Component {
  componentDidMount() {
    this.scrollDownHistory();
  }
  componentDidUpdate() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    if (this.messagesWrapper) {
      this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight;
    }
  }
  render() {
    const { classes, match, messages, user, activeChat } = this.props;

    if (match.params.chatId || match.params.matchId) {
      return activeChat ? (
        user.isMember ? (
          <div
            className={classes.messagesWrapper}
            ref={(wrapper) => {
              this.messagesWrapper = wrapper;
            }}
          >
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
    } else {
      return match.url === '/' ? (
        <Grid className={classes.welcomWarapper} container justifyContent="center" alignItems="center">
          <Paper className={classes.paper}>
            <Typography gutterBottom align="center" variant="h4">
              FUN & BUN
            </Typography>
            <Typography align="center">
              대학생들을 위한{' '}
              <Box display="inline" color="primary.main">
                랜덤 매칭
              </Box>{' '}
              및{' '}
              <Box display="inline" color="primary.main">
                그룹 채팅
              </Box>{' '}
              서비스
            </Typography>
          </Paper>
        </Grid>
      ) : (
        <Grid className={classes.welcomWarapper} container justifyContent="center" alignItems="center">
          <Paper className={classes.paper}>
            <Typography>매칭</Typography>
          </Paper>
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
