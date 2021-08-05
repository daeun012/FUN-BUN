import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  matchManualWarapper: { height: '90%' },
  paper: {
    padding: theme.spacing(3),
  },
  number: {
    color: theme.palette.secondary.light,
    fontSize: '18px',
  },
  randomMatchButton: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    color: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.light,
  },
});
const MatchManualPage = ({ classes, randomMatch }) => (
  <React.Fragment>
    <Grid className={classes.matchManualWarapper} container justifyContent="center" alignItems="center">
      <Paper className={classes.paper}>
        <Typography gutterBottom align="center" variant="h3">
          FUN & BUN 매칭
        </Typography>
        <Typography gutterBottom align="left">
          <span className={classes.number}>1.</span> 같은 과 학생들끼리 매칭이 성사됩니다.
        </Typography>
        <Typography gutterBottom align="left">
          <span className={classes.number}>2.</span> 1학년, 2학년, 3학년, 4학년 각 학년, 총 구성원 4명으로 매칭이 이루어집니다.
        </Typography>
        <Typography gutterBottom align="left">
          <span className={classes.number}>3.</span> 가장 적은 인원으로 구성된 매칭방을 우선순위로 두었습니다.
        </Typography>

        <Button className={classes.randomMatchButton} fullWidth size="large" onClick={randomMatch} variant="outlined">
          <Typography>매칭 시작하기</Typography>
        </Button>
      </Paper>
    </Grid>
  </React.Fragment>
);

MatchManualPage.propTypes = {
  randomMatch: PropTypes.func.isRequired,
};
export default withStyles(styles)(MatchManualPage);
