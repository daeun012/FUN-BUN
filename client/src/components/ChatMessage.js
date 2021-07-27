/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { alpha, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import randomColor from '../utils/randomColor';

const styles = (theme) => ({
  statusMessageWrapper: {
    textAlign: 'center',
    margin: `0px ${theme.spacing(3)}px ${theme.spacing(2)}px`,
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    backgroundColor: '#eeeeee',
    borderRadius: '5px',
  },
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
    marginLeft: theme.spacing(1.5),
  },
  messageFromMe: {
    marginRight: theme.spacing(0),
  },
  messagePaper: {
    padding: theme.spacing(1),
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  time: {
    display: 'block',
    textAlign: 'right',
  },
});

const ChatMessage = ({ classes, user, content, sender, createdAt, statusMessage }) => {
  const isMessageFromMe = sender._id === user._id;

  // 상태 메시지 출력
  if (statusMessage) {
    return (
      <div className={classes.statusMessageWrapper}>
        <Typography>
          {sender.username}
          {content}
        </Typography>
      </div>
    );
  }

  const userAvatar = <Avatar style={{ backgroundColor: randomColor(sender._id) }}>{sender.username}</Avatar>;

  return (
    <div className={classNames(classes.messageWrapper, isMessageFromMe && classes.messageWrappperFromMe)}>
      {!isMessageFromMe && userAvatar}
      <div className={classNames(classes.message, isMessageFromMe && classes.messageFromMe)}>
        <Typography variant="caption" style={{ color: randomColor(sender._id) }}>
          {!isMessageFromMe && sender.username}
        </Typography>
        <Paper className={classes.messagePaper}>
          <Typography variant="body2">{content}</Typography>
        </Paper>
        <Typography className={classNames(!isMessageFromMe && classes.time)} color="textSecondary" variant="caption">
          {moment(createdAt).format('LT')}
        </Typography>
      </div>
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
