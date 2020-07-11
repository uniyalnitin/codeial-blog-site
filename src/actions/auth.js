import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS } from './actionTypes';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed() {
  return {
    type: LOGIN_FAILED,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed());
      });
  };
}
