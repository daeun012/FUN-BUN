import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
    return (
      <div>
        <div className="card-content">
          <div className="row">
            <form onSubmit={this.handleSubmit}>
              <div>
                <div className="input-field col s12 userId">
                  <label>ID</label>
                  <input name="userId" type="text" onChange={(e) => this.setState({ userId: e.target.value })} value={this.state.userId} required />
                </div>
                <div className="input-field col s12">
                  <label>Password</label>
                  <input name="password" type="password" onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} autoComplete="current-password" required />
                </div>
              </div>
              <input type="submit" name="submit" value="SUBMIT" className="btn auth-submit-btn " />
            </form>
          </div>
        </div>

        <div className="footer">
          <div className="card-content">
            <div className="right">
              New Here?
              <NavLink to="/register" style={{ fontWeight: 'bold', color: '#7cb342' }}>
                {''} Create an account
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
