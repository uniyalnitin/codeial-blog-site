import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();
    this.state = {
      email: '',
      password: '',
    };
  }

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

  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(this.emailInputRef.current);
    // console.log(this.passwordInputRef.current.value);
    const { email, password } = this.state;
    this.props.dispatch(login(email, password));
  };

  render() {
    const { error, inProgress } = this.props.auth;

    return (
      <form className="login-form">
        {error && <div className="alert error-dailog">{error}</div>}
        <span className="login-signup-header">Log In</span>
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
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging in...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log in
            </button>
          )}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Login);
