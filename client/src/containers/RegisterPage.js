import React from 'react';
import { withSnackbar } from 'notistack';
import Auth from '../components/Auth';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/user-actions';

class RegisterPage extends React.Component {
  handleRegister = (data) => {
    return this.props.registerRequest(data).then(() => {
      if (this.props.status === 'SUCCESS') {
        this.props.history.push('/login');
        this.props.enqueueSnackbar('인증 메일을 전송했습니다.');
      } else {
      }
      this.props.enqueueSnackbar(this.props.error, {
        variant: 'error',
      });
    });
  };

  render() {
    return (
      <div>
        <Auth mode={false} onRegister={this.handleRegister} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.services.isStatus.register,
    error: state.services.errors.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (id, pw) => {
      return dispatch(registerRequest(id, pw));
    },
  };
};

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));
