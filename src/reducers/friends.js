import {
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_FAILED,
} from '../actions/actionTypes';

const defaultProfileState = [];

export default function friends(state = defaultProfileState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    case FETCH_FRIENDS_FAILED:
      return state;
    default:
      return state;
  }
}
