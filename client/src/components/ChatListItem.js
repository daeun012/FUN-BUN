import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme) => ({
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
});

const ChatListItem = ({ classes, data, selected }) => (
  <ListItem button component={Link} to={`/chat/${data._id}`} className={selected ? classes.selected : ''}>
    <ListItemText primary={data.title} secondary={data.description}></ListItemText>
  </ListItem>
);

ChatListItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default withRouter(withStyles(styles)(ChatListItem));
