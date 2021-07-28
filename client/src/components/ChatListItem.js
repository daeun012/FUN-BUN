import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme) => ({
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
});

const ChatListItem = ({ classes, chat, selected }) => (
  <ListItem button component={Link} to={`/chat/${chat._id}`} className={selected ? classes.selected : ''}>
    <ListItemText primary={chat.title} secondary={chat.description}></ListItemText>
  </ListItem>
);

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ChatListItem);
