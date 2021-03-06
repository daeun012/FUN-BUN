import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import ChatIcon from '@material-ui/icons/Chat';

const styles = (theme) => ({
  chatList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
  },
  circularProgressWrapper: {
    height: 'calc(100% - 56px)',
  },
  noChat: {
    textAlign: 'center',
  },
});

const ChatList = ({ classes, match, handleSideBar, disabled, myMatch, data, activeChat }) => (
  <React.Fragment>
    {disabled ? (
      <Grid container className={classes.circularProgressWrapper} alignItems="center" justifyContent="center">
        <CircularProgress />
      </Grid>
    ) : (
      <List className={classes.chatList} onClick={handleSideBar}>
        {myMatch || (data && data.length) ? (
          <div>
            {myMatch && (
              <ListItem button component={Link} to={`/match/${myMatch._id}`} className={classes.myMatch} selected={match.params.matchId === myMatch._id}>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary={myMatch.dept}></ListItemText>
              </ListItem>
            )}
            {data && data.length
              ? data.map((chat) => (
                  <ListItem key={chat._id} button component={Link} to={`/chat/${chat._id}`} selected={Boolean(activeChat && match.params.chatId === chat._id)}>
                    <ListItemText primary={chat.title} secondary={chat.description}></ListItemText>
                  </ListItem>
                ))
              : null}
          </div>
        ) : (
          <Typography className={classes.noChat}>????????? ?????? ??? ????????????.</Typography>
        )}
      </List>
    )}
  </React.Fragment>
);
ChatList.propTypes = {
  handleSideBar: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  myMatch: PropTypes.instanceOf(Object),
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};

export default withRouter(withStyles(styles)(ChatList));
