import React, { Component } from 'react';
import { PostsList, Chat } from './';
import FriendList from './FriendList';

class Home extends Component {
  render() {
    const { posts, friends, isLoggedIn } = this.props;
    console.log('isLoggedIN', isLoggedIn);
    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLoggedIn && <FriendList friends={friends} />}
        {isLoggedIn && <Chat />}
      </div>
    );
  }
}

export default Home;
