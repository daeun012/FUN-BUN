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

const ChatList = ({ classes, data }) => (
  <List className={classes.chatList}>
    {data && data.length ? data.map((chat) => <ChatListItem key={chat._id} data={chat}></ChatListItem>) : <Typography className={classes.noChat}>There are no chats yet..</Typography>}
  </List>
);

export default withStyles(styles)(ChatList);
