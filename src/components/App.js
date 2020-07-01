import React, { Component } from 'react';
import { fetchPosts } from '../actions/posts';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    return <div>App</div>;
  }
}

function mapPropsToState(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapPropsToState)(App);
