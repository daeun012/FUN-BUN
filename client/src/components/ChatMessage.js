/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import randomColor from '../util/randomColor';

const styles = (theme) => ({
  messageWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
  messageWrappperFromMe: {
    justifyContent: 'flex-end',
  },
  message: {
    maxWidth: '70%',
    minWidth: '10%',
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  messageFromMe: {
    marginRight: theme.spacing(2),
    backgroundColor: '#e6dcff',
  },
  statusMessage: {
    width: '100%',
    textAlign: 'center',
  },
  statusMessageUser: {
    display: 'inline',
  },
});

const ChatMessage = ({ classes, user, content, sender, createdAt, statusMessage }) => {
  console.log(statusMessage);
  const isMessageFromMe = sender._id === user._id;

  if (statusMessage) {
    return (
      <div className={classes.messageWrapper}>
        <Typography className={classes.statusMessage}>
          <Typography variant="caption" style={{ color: randomColor(sender._id) }} className={classes.statusMessageUser}>
            {sender.username}
          </Typography>
          {content}
          <Typography variant="caption" component="span">
            {moment(createdAt).fromNow()}
          </Typography>
        </Typography>
      </div>
    );
  }

  const userAvatar = <Avatar style={{ backgroundColor: randomColor(sender._id) }}>{sender.username}</Avatar>;

  //  ------------------
  // |NAME OF SENDER    |
  // |MESSAGE           |
  // |TIME OF MESSAGE   |
  //  ------------------
  return (
    // eslint-disable-next-line
    <div className={classNames(classes.messageWrapper, isMessageFromMe && classes.messageWrappperFromMe)}>
      {!isMessageFromMe && userAvatar}
      <Typography variant="caption" style={{ color: randomColor(sender._id) }}>
        {sender.username}
      </Typography>
      <Paper className={classNames(classes.message, isMessageFromMe && classes.messageFromMe)}>
        <Typography variant="body2">{content}</Typography>
        <Typography variant="caption" className={classes.time}>
          {moment(createdAt).fromNow()}
        </Typography>
      </Paper>
      {isMessageFromMe && userAvatar}
    </div>
  );
};

ChatMessage.propTypes = {
  content: PropTypes.string.isRequired,
  sender: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  statusMessage: PropTypes.bool,
};

ChatMessage.defaultProps = {
  statusMessage: false,
};

export default withStyles(styles)(ChatMessage);
