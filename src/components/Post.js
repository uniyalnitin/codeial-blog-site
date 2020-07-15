import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from './';
import { createComment, addLike } from '../actions/posts';
import { connect } from 'react-redux';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleAddComment = (e) => {
    if (e.key === 'Enter') {
      const { post } = this.props;
      this.props.dispatch(createComment(post._id, this.state.content));

      this.setState({
        content: '',
      });
    }
  };

  handlePostLike = (e) => {
    const { post, auth } = this.props;
    this.props.dispatch(addLike(post._id, 'Post', auth.user._id));
  };

  render() {
    const { post, auth } = this.props;
    const isPostLikedByUser = post.likes.includes(auth.user._id);

    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <Link to={`/user/${post.user._id}`}>
              <img
                src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                alt="user-pic"
              />
            </Link>
            <div>
              <span className="post-author">{post.user.name}</span>
              <span className="post-time">a minute ago</span>
            </div>
          </div>
          <div className="post-content">{post.content}</div>

          <div className="post-actions">
            <div className="post-like">
              <button
                className="post-like no-btn"
                onClick={this.handlePostLike}
              >
                {isPostLikedByUser ? (
                  <img
                    src="https://image.flaticon.com/icons/svg/833/833472.svg"
                    alt="likes-icon"
                  />
                ) : (
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-icon"
                  />
                )}
                <span>{post.likes.length}</span>
              </button>
            </div>

            <div className="post-comments-icon">
              <img
                src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className="post-comment-box">
            <input
              placeholder="Start typing a comment"
              onChange={this.handleChange}
              onKeyPress={this.handleAddComment}
            />
          </div>

          <div className="post-comments-list">
            {post.comments.map((comment) => (
              <Comment comment={comment} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapPropsToState(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapPropsToState)(Post);
