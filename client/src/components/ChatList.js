import React from 'react';
import PropTypes from 'prop-types';
import ChatListItem from './ChatListItem';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  chatList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
  },
  noChat: {
    textAlign: 'center',
  },
});

const ChatList = ({ classes, data, activeChat }) => (
  <List className={classes.chatList}>
    {data && data.length ? (
      data.map((chat) => <ChatListItem key={chat._id} data={chat} selected={Boolean(activeChat && activeChat._id === chat._id)}></ChatListItem>)
    ) : (
      <Typography className={classes.noChat}>There are no chats yet..</Typography>
    )}
  </List>
);
ChatList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.array.isRequired,
  activeChat: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(ChatList);
