import React from 'react';
import PropTypes from 'prop-types';
import ActiveChatInfo from './ActiveChatInfo';
import MatchInfo from './MatchInfo';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const chatInfoWidth = 230;

const styles = (theme) => ({
  drawer: {
    height: 'calc(100% - 64px - 75px)',
    width: chatInfoWidth,
    flexShrink: 0,
    backgroundColor: '#FAFBFD',
    borderRadius: 2,
    top: 64,
    border: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
});

const ChatInfo = ({ classes, window, handleChatInfo, open, activeChat, myMatch }) => {
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Drawer
      classes={{ paper: classes.drawer }}
      container={container}
      variant="persistent"
      anchor="right"
      onClose={handleChatInfo}
      open={open}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleChatInfo}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Route path="/chat/:chatId" render={() => <ActiveChatInfo activeChat={activeChat} />} />
      <Route path="/match/:matchId" render={() => <MatchInfo myMatch={myMatch} />} />
    </Drawer>
  );
};

ChatInfo.propTypes = {
  window: PropTypes.func,
  handleChatInfo: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ChatInfo);
