import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { addFriend } from '../actions/friends';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: null,
      error: null,
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
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: false,
        error: data.message,
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
    console.log('isUserAFriend', isUserAFriend);

    const { success, error } = this.state;
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
            <button className="button save-btn" onClick={this.handleAddFriend}>
              Add Friend
            </button>
          </div>
        ) : (
          <div className="btn-grp">
            <button className="button remove-btn">Remove Friend</button>
          </div>
        )}

        {success && (
          <div className="alert success-dailog">Friend Added Successfully</div>
        )}
        {error && <div className="alert error-dailog">{error}</div>}
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
