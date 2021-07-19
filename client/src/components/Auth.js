import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  logo: {
    fontSize: 75,
    fontWeight: 100,
  },
});

class Auth extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <Typography className={classes.logo} color="textSecondary">
            FUN & BUN
          </Typography>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title={this.props.mode ? 'LOGIN' : 'REGISTER'}></CardHeader>
            <CardContent>{this.props.mode ? <LoginForm onLogin={this.props.onLogin} /> : <RegisterForm onRegister={this.props.onRegister} />}</CardContent>
          </Card>
        </div>
        <Box mt={7}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            FUN & BUN {''}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    );
  }
}

Auth.propTypes = {
  mode: PropTypes.bool.isRequired,
  onLogin: PropTypes.func,
  onRegister: PropTypes.func,
};

export default withStyles(styles)(Auth);
