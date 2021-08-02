import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const chatInfoWidth = 220;

const styles = (theme) => ({
  drawer: {
    height: 'calc(100% - 64px - 75px)',
    width: chatInfoWidth,
    flexShrink: 0,
    backgroundColor: '#f5f5f5',
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
  memberList: {
    overflowY: 'scroll',
  },
});

class ChatInfo extends React.Component {
  render() {
    const { classes, window, handleChatInfo, open, activeChat } = this.props;
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
      activeChat && (
        <Drawer
          classes={{ paper: classes.drawer }}
          container={container}
          variant="persistent"
          anchor="right"
          open={open}
          onClose={handleChatInfo}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleChatInfo}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Box mb={4}>
            <Grid item xs container direction="column" justifyContent="center" alignItems="stretch">
              <Grid item align="center">
                <Typography variant="h5">{activeChat.dept || activeChat.title}</Typography>
              </Grid>
              <Grid item align="center">
                <Typography variant="overline">
                  {activeChat.members.length}명 / 개설일 {moment(activeChat.createdAt).format('YYYY.MM.DD')}
                </Typography>
              </Grid>
              <Grid item align="center">
                <Typography variant="body2">{activeChat.description}</Typography>
              </Grid>
            </Grid>
          </Box>
          <List className={classes.memberList}>
            {activeChat.members.map((member, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <UserAvatar size="40" name={member.username} color={member._id}></UserAvatar>
                </ListItemAvatar>
                <ListItemText primary={member.username} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )
    );
  }
}

ChatInfo.propTypes = {
  window: PropTypes.func,
  handleChatInfo: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
  }),
};

export default withStyles(styles)(ChatInfo);
