import React from 'react';
import Auth from '../components/Auth';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/auth-actions';

class LoginPage extends React.Component {
  handleLogin = (id, pw) => {
    return this.props.loginRequest(userId, password).then(() => {
      if (this.props.status === 'SUCCESS') {
        this.props.history.push('/');
      }
    });
  };

  render() {
    return (
      <div>
        <Auth mode={true} onLogin={this.handleLogin} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.auth.login.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id, pw));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
