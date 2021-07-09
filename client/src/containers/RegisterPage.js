import React from 'react';
import Auth from '../components/Auth';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/auth-actions';

class RegisterPage extends React.Component {
  handleRegister = (data) => {
    return this.props.registerRequest(data).then(() => {
      if (this.props.status === 'SUCCESS') {
        this.props.history.push('/login');
      }
    });
  };

  render() {
    return (
      <div>
        <Auth mode={false} onRegister={handleRegister} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.auth.register.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (id, pw) => {
      return dispatch(registerRequest(id, pw));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
