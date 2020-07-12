import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILED,
  FETCH_USER_PROFILE,
} from '../actions/actionTypes';

const initialProfileState = {
  user: {},
  inProgress: false,
  error: null,
  success: null,
};

export default function profile(state = initialProfileState, action) {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
        inProgress: false,
        error: null,
        success: true,
      };
    case USER_PROFILE_FAILED:
      return {
        ...state,
        user: {},
        inProgress: false,
        error: action.error,
        success: false,
      };
    case FETCH_USER_PROFILE:
      return {
        ...state,
        inProgress: true,
      };
    default:
      return state;
  }
}
