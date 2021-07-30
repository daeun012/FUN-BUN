import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ChatListItem = ({ chat, selected }) => (
  <ListItem button component={Link} to={`/chat/${chat._id}`} selected={selected}>
    <ListItemText primary={chat.title} secondary={chat.description}></ListItemText>
  </ListItem>
);

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default ChatListItem;
/* data && data.length ? (
  data.map((chat) => <ChatListItem key={chat._id} chat={chat} selected={Boolean(activeChat && activeChat._id === chat._id)}></ChatListItem>)
) : (
  <Typography className={classes.noChat}>참여한 채팅방이 없습니다...</Typography>
);
 */
