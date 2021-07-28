import React from 'react';
import PropTypes from 'prop-types';
import { alpha, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
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
    [theme.breakpoints.up('md')]: { width: 320, flexShrink: 0 },
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

class Tab extends React.Component {
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
    const { classes, window, handleSideBar, open, chat, createChat } = this.props;
    const { activeTab, searchValue } = this.state;

    const container = window !== undefined ? () => window().document.body : undefined;

    return <Paper className={classes.drawerPaper}></Paper>;
  }
}

Tab.propTypes = {};

export default withStyles(styles)(Tab);
