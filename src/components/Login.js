import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        <div className="field">
          <input type="email" placeholder="email" required />
        </div>
        <div className="field">
          <input type="password" placeholder="password" required />
        </div>
        <div className="field">
          <button>Log in</button>
        </div>
      </form>
    );
  }
}

export default Login;
