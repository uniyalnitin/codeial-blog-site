import React, { Component } from 'react';
import { fetchPosts } from '../actions/posts';
import { connect } from 'react-redux';
import PostsList from './PostsList';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        <PostsList posts={posts} />
      </div>
    );
  }
}

function mapPropsToState(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapPropsToState)(App);
