import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.emailInputRef.current);
    console.log(this.passwordInputRef.current.value);
  };

  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        <div className="field">
          <input
            type="email"
            placeholder="email"
            ref={this.emailInputRef}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            ref={this.passwordInputRef}
            required
          />
        </div>
        <div className="field">
          <button onClick={this.handleFormSubmit}>Log in</button>
        </div>
      </form>
    );
  }
}

export default Login;
