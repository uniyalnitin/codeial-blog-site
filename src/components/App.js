import React, { Component } from 'react';
import { fetchPosts } from '../actions/posts';
import { connect } from 'react-redux';
import { Navbar, Home, Page404, Login, SignUp } from './';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';

const Settings = () => <div>Settings</div>;

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedIn, path, component: Component } = privateRouteProps;

  return (
    <Route
      to={path}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode(token);
      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          _id: user._id,
          email: user.email,
          name: user.name,
        })
      );
    }
  }

  render() {
    const { posts, auth } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => {
                return <Home posts={posts} />;
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute
              isLoggedIn={auth.isLoggedIn}
              path="/settings"
              component={Settings}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

function mapPropsToState(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}

export default connect(mapPropsToState)(App);
