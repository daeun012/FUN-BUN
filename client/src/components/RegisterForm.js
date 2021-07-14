import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import ValidateInput from '../services/ValidateInput';

const styles = (theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      username: '',
      email: '',
      studentId: '',
      grade: '',
      dept: '',
      userIdError: '',
      passwordError: '',
      usernameError: '',
      emailError: '',
      studentIdError: '',
      userIdValid: false,
      passwordValid: false,
      usernameValid: false,
      emailValid: false,
      studentIdValid: false,
      responseToPost: '',
      message: '',
    };
  }

  handleUserIdKeyUp = (e) => {
    let result = ValidateInput.user.userId(e.target.value);

    this.setState({
      userIdError: result.userIdError,
      userIdValid: result.userIdValid,
    });
  };

  handlePasswordKeyUp = (e) => {
    let result = ValidateInput.user.password(e.target.value);

    this.setState({
      passwordError: result.passwordError,
      passwordValid: result.passwordValid,
    });
  };

  handleUsernameKeyUp = (e) => {
    let result = ValidateInput.user.username(e.target.value);

    this.setState({
      usernameError: result.usernameError,
      usernameValid: result.usernameValid,
    });
  };

  handleEmailKeyUp = (e) => {
    let result = ValidateInput.user.email(e.target.value);

    this.setState({
      emailError: result.emailError,
      emailValid: result.emailValid,
    });
  };

  handleStudentIdKeyUp = (e) => {
    let result = ValidateInput.user.studentId(e.target.value);

    this.setState({
      studentIdError: result.studentIdError,
      studentIdValid: result.studentIdValid,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.props.onRegister({
      userId: this.state.userId,
      password: this.state.password,
      username: this.state.username,
      email: this.state.email,
      studentId: this.state.studentId,
      grade: this.state.grade,
      dept: this.state.dept,
    });
  };

  render() {
    const { classes } = this.props;
    const depts = ['전자정보통신공학과', '컴퓨터공학과', '물리치료학과', '경제학과', '물류학과'];

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="ID"
              name="userId"
              onChange={(e) => this.setState({ userId: e.target.value })}
              value={this.state.userId}
              onKeyUp={this.handleUserIdKeyUp}
              error={this.state.userIdError === '' ? false : true}
              helperText={this.state.userIdError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
              onKeyUp={this.handlePasswordKeyUp}
              error={this.state.passwordError === '' ? false : true}
              helperText={this.state.passwordError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="username"
              label="Name"
              onChange={(e) => this.setState({ username: e.target.value })}
              value={this.state.username}
              onKeyUp={this.handleUsernameKeyUp}
              error={this.state.usernameError === '' ? false : true}
              helperText={this.state.usernameError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="email"
              type="email"
              label="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
              value={this.state.email}
              onKeyUp={this.handleEmailKeyUp}
              error={this.state.emailError === '' ? false : true}
              helperText={this.state.emailError}
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="studentId"
              label="Student_ID : 학번"
              onChange={(e) => this.setState({ studentId: e.target.value })}
              value={this.state.studentId}
              onKeyUp={this.handleStudentIdKeyUp}
              error={this.state.studentIdError === '' ? false : true}
              helperText={this.state.studentIdError}
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select label="grade : 학년" value={this.state.grade} onChange={(e) => this.setState({ grade: e.target.value })} variant="outlined" fullWidth required>
              <MenuItem value="1">1학년</MenuItem>
              <MenuItem value="2">2학년</MenuItem>
              <MenuItem value="3">3학년</MenuItem>
              <MenuItem value="4">4학년</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select label="dept : 학과" value={this.state.dept} onChange={(e) => this.setState({ dept: e.target.value })} variant="outlined" fullWidth required>
              {depts.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Button
          className={classes.submit}
          type="submit"
          name="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={
            !this.state.userIdValid ||
            !this.state.passwordValid ||
            !this.state.usernameValid ||
            !this.state.emailValid ||
            !this.state.studentIdValid ||
            this.state.grade === '' ||
            this.state.dept === ''
          }
        >
          Create
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            Already have an account?{' '}
            <Link component={NavLink} to="/login" variant="body2">
              Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(RegisterForm);
