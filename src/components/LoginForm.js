import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
const styles = (theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let { userId, password } = this.state;
    this.props.onLogin(userId, password);
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField variant="outlined" required fullWidth label="ID" name="userId" autoFocus onChange={(e) => this.setState({ userId: e.target.value })} value={this.state.userId} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
            />
          </Grid>
        </Grid>
        <Button className={classes.submit} type="submit" color="primary" variant="contained" fullWidth name="submit">
          SUBMIT
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={NavLink} to="/register" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            New Here?{' '}
            <Link component={NavLink} to="/register" variant="body2">
              Create an account
            </Link>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
