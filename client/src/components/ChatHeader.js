import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  appBar: {
    position: 'fixed',
    width: 'calc(100% - 320px)',
    marginLeft: 320,
  },
  appBarTitle: {
    flex: 1,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});

const ChatHeader = ({ classes }) => (
  <AppBar className={classes.appBar}>
    <Toolbar>
      <Typography variant="h5" className={classes.appBarTitle}>
        FUN & BUN
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(ChatHeader);
