import React from 'react';
import PropTypes from 'prop-types';
import ChatList from './ChatList';
import CreateChatButton from './CreateChatButton';
import Setting from './Setting';
import UserAvatar from './UserAvatar';
import { Link } from 'react-router-dom';
import { alpha, withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ForumIcon from '@material-ui/icons/Forum';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExploreIcon from '@material-ui/icons/Explore';

const styles = (theme) => ({
  drawerPaper: { [theme.breakpoints.up('md')]: { width: 320, flexShrink: 0 } },
  drawer: {
    width: 320,
  },
  circularProgressWrapper: {
    height: 'calc(100% - 56px)',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '20ch',
  },
});

class Sidebar extends React.Component {
  state = {
    activeTab: 0,
    searchValue: '',
  };

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  handleTabChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  filterChat = (chat) => {
    const { searchValue } = this.state;

    return chat.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
  };

  render() {
    const { classes, isConnected, window, handleSideBar, open, createChat, logoutRequest, chat, user } = this.props;
    const { activeTab, searchValue } = this.state;

    const container = window !== undefined ? () => window().document.body : undefined;

    const header = (
      <React.Fragment>
        <Box mb={3}>
          <Grid item xs container direction="column" justifyContent="center" alignItems="stretch">
            <Grid align="right" item>
              <Setting onLogout={logoutRequest}></Setting>
            </Grid>
            <Grid item align="center">
              <UserAvatar size="50" color={user._id} name={user.username}></UserAvatar>
            </Grid>
            <Grid item align="center">
              <Typography gutterBottom variant="subtitle1">
                {user.username}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Toolbar style={{ backgroundColor: '#fafafa' }}>
          <div className={classes.search} edge="start">
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색..."
              value={searchValue}
              onChange={this.handleSearchChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <CreateChatButton createChat={createChat}></CreateChatButton>
        </Toolbar>
      </React.Fragment>
    );

    const matchingButton = (
      <Button style={{ borderRadius: 0 }} /* component={Link} to="/match" */ component={Link} to={'/match'} variant="outlined" color="secondary" size="large" fullWidth>
        매칭 시작하기
      </Button>
    );

    const bottomNavigation = (
      <div>
        <BottomNavigation value={activeTab} onChange={this.handleTabChange} showLabels>
          <Tooltip title="My Chats" arrow>
            <BottomNavigationAction icon={<ForumIcon />} />
          </Tooltip>
          <Tooltip title="Explore" arrow>
            <BottomNavigationAction icon={<ExploreIcon />} />
          </Tooltip>
        </BottomNavigation>
      </div>
    );

    return (
      <nav className={classes.drawerPaper}>
        <Hidden smUp implementation="css">
          <Drawer
            classes={{ paper: classes.drawer }}
            container={container}
            variant="temporary"
            anchor="left"
            open={open}
            onClose={handleSideBar}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {header}
            {isConnected && !chat.myMatch && matchingButton}
            <ChatList
              disabled={!isConnected}
              handleSideBar={handleSideBar}
              myMatch={activeTab === 0 && chat.myMatch}
              data={this.filterChat(activeTab === 0 ? chat.myChat : chat.allChat)}
              activeChat={chat.activeChat}
            ></ChatList>
            {bottomNavigation}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer variant="permanent" classes={{ paper: classes.drawer }} open>
            {header}
            {isConnected && !chat.myMatch && matchingButton}
            <ChatList disabled={!isConnected} myMatch={activeTab === 0 && chat.myMatch} data={this.filterChat(activeTab === 0 ? chat.myChat : chat.allChat)} activeChat={chat.activeChat}></ChatList>
            {bottomNavigation}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  window: PropTypes.func,
  open: PropTypes.bool.isRequired,
  handleSideBar: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    allChat: PropTypes.instanceOf(Array).isRequired,
    myChat: PropTypes.instanceOf(Array).isRequired,
    activeChat: PropTypes.instanceOf(Object),
    myMatch: PropTypes.instanceOf(Object),
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Sidebar);
