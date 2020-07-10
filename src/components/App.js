import React, { Component } from 'react';
import { fetchPosts } from '../actions/posts';
import { connect } from 'react-redux';
import { Navbar, Home, Page404, Login } from './';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignUp = () => <div>SignUp</div>;

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
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
  };
}

export default connect(mapPropsToState)(App);
