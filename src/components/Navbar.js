import React from 'react';
import { Link } from 'react-router-dom';

import { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import { searchUsers } from '../actions/search';

class Navbar extends Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  handleSearch = (e) => {
    const searchText = e.target.value;
    this.props.dispatch(searchUsers(searchText));
  };

  render() {
    const { user, isLoggedIn } = this.props.auth;
    const { results } = this.props;

    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input placeholder="Search" onKeyPress={this.handleSearch} />
          {results.length > 0 && (
            <div className="search-results">
              <ul>
                {results.map((user) => (
                  <Link to={`/user/${user._id}`}>
                    <li className="search-results-row" key={user._id}>
                      <img
                        src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                        alt="user-dp"
                      />
                      <span>{user.name}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="right-nav">
          {user && (
            <div className="user">
              <Link to="/settings">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                  id="user-dp"
                />
              </Link>
              <span>{user.name}</span>
            </div>
          )}
          <div className="nav-links">
            <ul>
              {!isLoggedIn && (
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              )}
              {isLoggedIn && <li onClick={this.logOut}>Log out</li>}
              {!isLoggedIn && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}
export default connect(mapStateToProps)(Navbar);
