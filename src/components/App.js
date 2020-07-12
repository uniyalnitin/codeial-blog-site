import React, { Component } from 'react';
import { fetchPosts } from '../actions/posts';
import { connect } from 'react-redux';
import {
  Navbar,
  Home,
  Page404,
  Login,
  SignUp,
  Settings,
  UserProfile,
} from './';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { fetchUserFriends } from '../actions/friends';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedIn, path, component: Component } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        )
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

      this.props.dispatch(fetchUserFriends(user._id));
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedIn={auth.isLoggedIn}
                  />
                );
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute
              isLoggedIn={auth.isLoggedIn}
              path="/settings"
              component={Settings}
            />
            <PrivateRoute
              isLoggedIn={auth.isLoggedIn}
              path="/user/:userId"
              component={UserProfile}
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
    friends: state.friends,
  };
}

export default connect(mapPropsToState)(App);
