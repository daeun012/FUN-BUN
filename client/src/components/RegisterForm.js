import React, { Component } from 'react';
import M from 'materialize-css';
import { NavLink } from 'react-router-dom';
import ValidateInput from '../services/ValidateInput';

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

  componentDidMount() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
    console.log(this.props.onRegister);
  }

  render() {
    return (
      <div>
        <div className="card-content">
          <div className="row">
            <form onSubmit={this.handleSubmit}>
              <div className="input-field col s12 userId">
                <input name="userId" type="text" onChange={(e) => this.setState({ userId: e.target.value })} value={this.state.userId} onKeyUp={this.handleUserIdKeyUp} required />
                <div className="register-error">{this.state.userIdError}</div>
                <label>ID</label>
              </div>

              <div className="input-field col s12">
                <input name="password" type="password" onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} onKeyUp={this.handlePasswordKeyUp} required />
                <div className="register-error">{this.state.passwordError}</div>
                <label>Password</label>
              </div>

              <div className="input-field col s12">
                <input name="username" type="text" onChange={(e) => this.setState({ username: e.target.value })} value={this.state.username} onKeyUp={this.handleUsernameKeyUp} required />
                <div className="register-error">{this.state.usernameError}</div>
                <label>Name</label>
              </div>

              <div className="input-field col s12">
                <input name="email" type="email" onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} onKeyUp={this.handleEmailKeyUp} required />
                <div className="register-error">{this.state.emailError}</div>
                <label>Email</label>
              </div>

              <div className="input-field col s12">
                <input name="studentId" type="text" onChange={(e) => this.setState({ studentId: e.target.value })} value={this.state.studentId} onKeyUp={this.handleStudentIdKeyUp} required />
                <div className="register-error">{this.state.studentIdError}</div>
                <label>Student_ID : 학번</label>
              </div>

              <div className="input-field col s6 ">
                <select defaultValue="0" onChange={(e) => this.setState({ grade: e.target.value })}>
                  <option value="0" disabled>
                    grade : 학년
                  </option>
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                  <option value="4">4학년</option>
                </select>
              </div>

              <div className="input-field col s6">
                <select defaultValue="0" onChange={(e) => this.setState({ dept: e.target.value })}>
                  <option value="0" disabled>
                    dept : 학과
                  </option>
                  <option value="1">전자정보통신공학과</option>
                  <option value="2">정보보안학과</option>
                  <option value="3">컴퓨터공학과</option> <option value="4">환경공학과</option> <option value="5">경제학과</option> <option value="6">행정학과</option>
                </select>
              </div>

              <input
                type="submit"
                name="submit"
                value="CREATE"
                className="btn auth-submit-btn"
                disabled={
                  !this.state.userIdValid ||
                  !this.state.passwordValid ||
                  !this.state.usernameValid ||
                  !this.state.emailValid ||
                  !this.state.studentIdValid ||
                  this.state.grade === '' ||
                  this.state.grade === 0 ||
                  this.state.dept === '' ||
                  this.state.dept === 0
                }
              />
            </form>
          </div>
        </div>
        <div className="footer">
          <div className="card-content">
            <div className="right">
              Already have an account?
              <NavLink to="/login" style={{ fontWeight: 'bold', color: '#7cb342' }}>
                {' '}
                Sing In
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
