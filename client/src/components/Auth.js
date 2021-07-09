import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class Auth extends Component {
  render() {
    console.log(this.props.registerRequest);
    return (
      <div className="container auth">
        <Link className="logo" to="/">
          FUN & BUN
        </Link>
        <div className="card">
          <div className="header indigo lighten-3 white-text center">
            <div className="card-content">{this.props.mode ? 'LOGIN' : 'REGISTER'}</div>
          </div>
          {this.props.mode ? <LoginForm onLogin={this.props.onLogin} /> : <RegisterForm onRegister={this.props.onRegister} />}
        </div>
      </div>
    );
  }
}

export default Auth;
