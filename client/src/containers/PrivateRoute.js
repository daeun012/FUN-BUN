import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStatusRequest } from '../actions/auth-actions';
import AuthService from '../services/AuthService';

const Auth = new AuthService();

class PrivateRoute extends React.Component {
  componentDidMount() {
    if (!Auth.loggedIn()) {
      this.props.history.replace('/login');
    } else {
      try {
        const confirm = Auth.getConfirm();
        console.log('confirmation is:', confirm);
        this.props.getStatusRequest(confirm.id);
      } catch (err) {
        console.log(err);
        Auth.logout();
        this.props.history.replace('/login');
      }
    }
  }
  render() {
    const { component: Component, isLoggedIn, user, ...rest } = this.props;

    if (isLoggedIn && user) {
      return <Route {...rest} render={(props) => <Component {...props} />} />;
    } else {
      return null;
    }
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  getStatusRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.status.isLoggedIn,
  user: state.auth.status.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: (uid) => {
      return dispatch(getStatusRequest(uid));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
