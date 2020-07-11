import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup, clearAuthState } from '../actions/auth';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleConfirmPasswordChange = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;
    if (name && email && password && confirmPassword) {
      this.props.dispatch(signup(name, email, password, confirmPassword));
    }
  };
  render() {
    const { error, inProgress } = this.props.auth;
    return (
      <form className="login-form">
        {error && <div className="alert error-dailog">{error}</div>}
        <span className="login-signup-header">Sign Up</span>
        <div className="field">
          <input
            type="text"
            placeholder="name"
            // ref={this.emailInputRef}
            onChange={this.handleNameChange}
            required
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="email"
            // ref={this.emailInputRef}
            onChange={this.handleEmailChange}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            // ref={this.passwordInputRef}
            onChange={this.handlePasswordChange}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="confirm password"
            // ref={this.passwordInputRef}
            onChange={this.handleConfirmPasswordChange}
            required
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Signing up...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Sign Up
            </button>
          )}
        </div>
      </form>
    );
  }
}
function mapStatsToProp(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStatsToProp)(SignUp);
