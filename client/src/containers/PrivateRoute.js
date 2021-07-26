import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserDataRequest } from '../actions/user-actions';
import AuthService from '../services/AuthService';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  componentDidMount() {
    if (!this.Auth.loggedIn()) {
      this.props.history.replace('/login');
    } else {
      try {
        const confirm = this.Auth.getConfirm();
        console.log('confirmation is:', confirm);
        this.props.getUserDataRequest(confirm.id);
      } catch (err) {
        console.log(err);
        this.Auth.logout();
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
  getUserDataRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  user: state.user.userData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDataRequest: (uid) => {
      return dispatch(getUserDataRequest(uid));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
