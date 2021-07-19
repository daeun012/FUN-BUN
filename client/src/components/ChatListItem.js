import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme) => ({
  selectedItem: {
    backgroundColor: theme.palette.action.selected,
  },
});

const ChatListItem = ({ classes, data }) => (
  <ListItem button>
    <ListItemText primary={data.title} secondary={data.description}></ListItemText>
  </ListItem>
);

ChatListItem.propTypes = {
  chat: PropTypes.shape({
    allChat: PropTypes.object,
    myChat: PropTypes.object,
  }).isRequired,
};

export default withStyles(styles)(ChatListItem);
