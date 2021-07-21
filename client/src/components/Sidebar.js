import React from 'react';
import PropTypes from 'prop-types';
import ChatList from './ChatList';
import CreateChatButton from './CreateChatButton';
import { alpha, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import ForumIcon from '@material-ui/icons/Forum';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme) => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: 320,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    },
    marginRight: theme.spacing(2),
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
    const { classes, chat } = this.props;
    const { activeTab, searchValue } = this.state;

    return (
      <Drawer variant="permanent" className={classes.drawerPaper}>
        <Toolbar>
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
          <CreateChatButton></CreateChatButton>
        </Toolbar>
        <Divider />
        <ChatList data={this.filterChat(activeTab === 0 ? chat.myChat : chat.allChat)}></ChatList>
        <BottomNavigation value={activeTab} onChange={this.handleTabChange} showLabels>
          <Tooltip title="My Chats" arrow>
            <BottomNavigationAction icon={<RestoreIcon />} />
          </Tooltip>
          <Tooltip title="Explore" arrow>
            <BottomNavigationAction icon={<ForumIcon />} />
          </Tooltip>
        </BottomNavigation>
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  chat: PropTypes.shape({
    allChat: PropTypes.instanceOf(Array).isRequired,
    myChat: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
};

export default withStyles(styles)(Sidebar);
