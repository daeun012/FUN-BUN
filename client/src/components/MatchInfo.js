import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  memberList: {
    height: '100%',
    overflowY: 'scroll',
  },
});

class MatchInfo extends React.Component {
  render() {
    const { classes, myMatch } = this.props;

    return (
      myMatch && (
        <React.Fragment>
          <Box mb={4}>
            <Grid item xs container direction="column" justifyContent="center" alignItems="stretch">
              <Grid item align="center">
                <Typography variant="h5">{myMatch.dept}</Typography>
              </Grid>
              <Grid item align="center">
                <Typography variant="overline">
                  {myMatch.members.length}명 / 개설일 {moment(myMatch.createdAt).format('YYYY.MM.DD')}
                </Typography>
              </Grid>
              <Grid item align="center">
                <Typography variant="body2">{myMatch.description}</Typography>
              </Grid>
            </Grid>
          </Box>
          <List className={classes.memberList}>
            {myMatch.members.map((member, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <UserAvatar size="40" name={member.username} color={member._id}></UserAvatar>
                </ListItemAvatar>
                <ListItemText primary={member.username} secondary={`${member.grade}학년`} />
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      )
    );
  }
}

MatchInfo.propTypes = {
  myMatch: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
  }),
};

export default withStyles(styles)(MatchInfo);
