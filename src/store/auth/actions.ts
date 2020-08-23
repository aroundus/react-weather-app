const REDUCER = 'Auth';

export const LOGIN  = `${REDUCER}/LOGIN`;
export const LOGOUT = `${REDUCER}/LOGOUT`;

export const LOGIN_SUCCESS = `${REDUCER}/LOGIN_SUCCESS`;
export const LOGIN_FAILURE = `${REDUCER}/LOGIN_FAILURE`;

export const CLEAR = `${REDUCER}/CLEAR`;

export function login(email: string, password: string) {
  return {
    type: LOGIN,
    payload: {
      email,
      password
    }
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function loginSuccess(accessToken: string | null, refreshToken: string | null) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      isLoggedIn: true,
      accessToken,
      refreshToken
    }
  };
}

export function loginFailure(message: string) {
  return {
    type: LOGIN_FAILURE,
    payload: {
      message
    }
  };
}

export function clear() {
  return {
    type: CLEAR
  };
}
