import { APIUrls } from '../helpers/urls';
import {
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_FAILED,
  ADD_FRIEND,
} from './actionTypes';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIUrls.userFriends();
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(fetchFriendsSuccess(data.data.friends));
          return;
        }
        dispatch(fetchFriendsError(data.message));
      });
  };
}

export function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}

export function fetchFriendsError(error) {
  return {
    type: FETCH_FRIENDS_FAILED,
    error,
  };
}

export function addFriend(friendship) {
  return {
    type: ADD_FRIEND,
    friend: friendship,
  };
}
