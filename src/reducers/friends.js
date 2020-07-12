import {
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_FAILED,
  ADD_FRIEND,
} from '../actions/actionTypes';

const defaultProfileState = [];

export default function friends(state = defaultProfileState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    case FETCH_FRIENDS_FAILED:
      return state;
    case ADD_FRIEND:
      return state.concat(action.friend);
    default:
      return state;
  }
}
