import React from 'react';
import PropTypes from 'prop-types';
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

const ChatHeader = ({ classes, handleSideBar }) => (
  <AppBar className={classes.appBar}>
    <Toolbar>
      <IconButton color="inherit" aria-label="open drawer" edge="start" className={classes.sideBarButton} onClick={handleSideBar}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Typography variant="h5" className={classes.appBarTitle} noWrap>
        FUN & BUN
      </Typography>
    </Toolbar>
  </AppBar>
);
ChatHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleSideBar: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChatHeader);
