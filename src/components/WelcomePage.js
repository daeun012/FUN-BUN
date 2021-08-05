import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  welcomWarapper: { height: '90%' },
  paper: {
    padding: theme.spacing(3),
  },
  textColor: {
    color: theme.palette.primary.main,
  },
});
const WelcomePage = ({ classes }) => (
  <Grid className={classes.welcomWarapper} container justifyContent="center" alignItems="center">
    <Paper className={classes.paper}>
      <Typography gutterBottom align="center" variant="h4">
        FUN & BUN
      </Typography>
      <Typography align="center">
        대학생들을 위한 <span className={classes.textColor}>랜덤 매칭</span> 및 <span className={classes.textColor}>그룹 채팅</span> 서비스
      </Typography>
    </Paper>
  </Grid>
);

export default withStyles(styles)(WelcomePage);
