import React from 'react';
import PropTypes from 'prop-types';
import ChatMenu from './ChatMenu';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const styles = (theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 320px)',
      marginLeft: 320,
    },
  },
  appBarTitle: {
    marginLeft: theme.spacing(2),
  },
  sideBarButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

const ChatHeader = ({ classes, handleSideBar, leaveChat, activeChat, user }) => (
  <AppBar className={classes.appBar}>
    <Toolbar>
      <IconButton color="inherit" aria-label="open drawer" edge="start" className={classes.sideBarButton} onClick={handleSideBar}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      {activeChat ? (
        <Typography variant="h5" className={classes.appBarTitle} noWrap>
          {activeChat.title}
          {user.isMember ? <ChatMenu onLeaveChat={() => leaveChat(activeChat._id)}></ChatMenu> : null}
        </Typography>
      ) : (
        <Typography variant="h5" className={classes.appBarTitle} noWrap>
          FUN & BUN
        </Typography>
      )}
    </Toolbar>
  </AppBar>
);

ChatHeader.propTypes = {
  handleSideBar: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withStyles(styles)(ChatHeader);
