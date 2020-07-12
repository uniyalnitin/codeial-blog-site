import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { addFriend, removeFriend } from '../actions/friends';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: null,
      error: null,
      successMessage: null,
      errorMessage: null,
      inProgress: false,
    };
  }
  componentDidMount() {
    const { match } = this.props;
    // console.log('props', this.props.match);
    if (match.params.userId) {
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  checkIfUserIsAFriend = () => {
    const { friends, match } = this.props;

    const userId = match.params.userId;
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);
    return index != -1;
  };

  handleAddFriend = async () => {
    this.setState({
      inProgress: true,
    });
    const { friends, match } = this.props;
    const userId = match.params.userId;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        inProgress: false,
        successMessage: 'Friend Added Successfully',
        error: false,
        errorMessage: null,
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: false,
        error: true,
        errorMessage: data.messsage,
        inProgress: false,
      });
    }
  };

  handleRemoveFriend = async () => {
    this.setState({
      inProgress: true,
    });

    const userId = this.props.match.params.userId;
    const url = APIUrls.removeFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: data.message,
        error: false,
        inProgress: false,
      });

      this.props.dispatch(removeFriend(userId));
    } else {
      this.setState({
        success: false,
        error: true,
        errorMessage: data.message,
        inProgress: false,
      });
    }
  };

  render() {
    const {
      match: { params },
      profile,
    } = this.props;
    const user = profile.user;

    if (profile.inProgress) {
      return (
        <div className="settings">
          <h1>Loading...</h1>
        </div>
      );
    }

    const isUserAFriend = this.checkIfUserIsAFriend();

    const {
      success,
      error,
      successMessage,
      inProgress,
      errorMessage,
    } = this.state;

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
            id="user-dp"
          />
        </div>
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>
        {!isUserAFriend ? (
          <div className="btn-grp">
            <button
              className="button save-btn"
              onClick={this.handleAddFriend}
              disabled={inProgress==true}
            >
              Add Friend
            </button>
          </div>
        ) : (
          <div className="btn-grp">
            <button
              className="button remove-btn"
              onClick={this.handleRemoveFriend}
              disabled={inProgress==true}
            >
              Remove Friend
            </button>
          </div>
        )}

        {success && (
          <div className="alert success-dailog">{successMessage}</div>
        )}
        {error && <div className="alert error-dailog">{errorMessage}</div>}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    profile: state.profile,
    friends: state.friends,
  };
}

export default connect(mapStateToProps)(Profile);
