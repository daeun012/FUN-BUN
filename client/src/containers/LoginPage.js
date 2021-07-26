import React from 'react';
import { withSnackbar } from 'notistack';
import Auth from '../components/Auth';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/user-actions';

class LoginPage extends React.Component {
  handleLogin = (userId, password) => {
    return this.props.loginRequest(userId, password).then(() => {
      if (this.props.status === 'SUCCESS') {
        this.props.enqueueSnackbar('로그인 성공', {
          variant: 'info',
        });
        this.props.history.push('/');
      } else {
        this.props.enqueueSnackbar(this.props.error, {
          variant: 'error',
        });
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
    status: state.services.isStatus.login,
    error: state.services.errors.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id, pw));
    },
  };
};

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
