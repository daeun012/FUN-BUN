import React from 'react';
import PropTypes from 'prop-types';
import ChatMenu from './ChatMenu';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

const sideBarWidth = 320;

const styles = (theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${sideBarWidth}px )`,
      marginLeft: sideBarWidth,
    },
  },
  appBarTitle: {
    flex: 1,
    marginLeft: theme.spacing(2),
  },
  sideBarButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

const ChatHeader = ({ classes, handleSideBar, handleChatInfo, leaveChat, user, activeChat, myMatch }) => (
  <AppBar className={classes.appBar}>
    <Toolbar>
      <IconButton color="inherit" aria-label="open sideBar" edge="start" className={classes.sideBarButton} onClick={handleSideBar}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Route
        exact
        path={['/', '/match']}
        render={() => (
          <Typography variant="h5" className={classes.appBarTitle} noWrap>
            FUN & BUN
          </Typography>
        )}
      />
      <Route
        path="/chat/:chatId"
        render={() =>
          activeChat && (
            <React.Fragment>
              <Typography variant="h5" className={classes.appBarTitle} noWrap>
                {activeChat.title}
                {user.isMember && activeChat.title ? <ChatMenu onLeaveChat={() => leaveChat(activeChat._id)}></ChatMenu> : null}
              </Typography>
              <IconButton color="inherit" aria-label="open chatInfo" onClick={handleChatInfo}>
                <PeopleAltOutlinedIcon />
              </IconButton>
            </React.Fragment>
          )
        }
      />
      <Route
        path="/match/:matchId"
        render={() => (
          <React.Fragment>
            <Typography variant="h5" className={classes.appBarTitle} noWrap>
              {myMatch.dept}
            </Typography>
            <IconButton color="inherit" aria-label="open chatInfo" onClick={handleChatInfo}>
              <PeopleAltOutlinedIcon />
            </IconButton>
          </React.Fragment>
        )}
      />
    </Toolbar>
  </AppBar>
);

ChatHeader.propTypes = {
  handleSideBar: PropTypes.func.isRequired,
  handleChatInfo: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
  activeChat: PropTypes.object,
  myMatch: PropTypes.object,
  user: PropTypes.shape({
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withStyles(styles)(ChatHeader);
