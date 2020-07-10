import React, { Component } from 'react';
import { fetchPosts } from '../actions/posts';
import { connect } from 'react-redux';
import { PostsList, Navbar } from './';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = () => <div>Home</div>

const Login = () => <div>Login</div>

const SignUp = () => <div>SignUp</div>

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
        {/* <PostsList posts={posts} /> */}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp} />
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
