const {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} = require('../actions/actionTypes');

const initialAuthState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        inProgress: false,
        error: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        inProgress: false,
        error: action.error,
      };
    default:
      return state;
  }
}