import React from 'react';
import PropTypes from 'prop-types';
import ChatListItem from './ChatListItem';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
const styles = () => ({
  chatList: {
    height: 'calc(100% - 56px)',
  },
  noChat: {
    textAlign: 'center',
  },
});

const ChatList = ({ classes, handleSideBar, data, activeChat }) => (
  <List className={classes.chatList} onClick={handleSideBar}>
    <Button variant="outlined" color="secondary" size="large" fullWidth>
      매칭하기
    </Button>
    {data && data.length ? (
      data.map((chat) => <ChatListItem key={chat._id} chat={chat} selected={Boolean(activeChat && activeChat._id === chat._id)}></ChatListItem>)
    ) : (
      <Typography className={classes.noChat}>참여한 채팅방이 없습니다...</Typography>
    )}
  </List>
);
ChatList.propTypes = {
  handleSideBar: PropTypes.func,
  data: PropTypes.array.isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};

export default withStyles(styles)(ChatList);
