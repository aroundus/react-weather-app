import { AnyAction } from 'redux';
import { produce } from 'immer';
import {
  LOGIN, LOGOUT,
  LOGIN_SUCCESS, LOGIN_FAILURE,
  CLEAR
} from 'store/auth/actions';
import { User } from 'utils/types';

const jwt = require('jsonwebtoken');

const initialState = {
  loading: false,
  message: '',

  accessToken: null,
  refreshToken: null,

  isLoggedIn: false,
  isLoginFailed: false,

  user: {} as User
};

export function auth(state = initialState, action: AnyAction) {
  return produce(state, draft => {
    switch (action.type) {
      case LOGIN: {
        draft.loading = true;
        break;
      }

      case LOGOUT: {
        draft.isLoggedIn = false;

        draft.accessToken  = null;
        draft.refreshToken = null;

        window.location.reload();
        window.localStorage.clear();
        break;
      }

      case LOGIN_SUCCESS: {
        draft.loading = false;

        draft.isLoggedIn    = true;
        draft.isLoginFailed = false;

        draft.accessToken  = action.payload.accessToken;
        draft.refreshToken = action.payload.refreshToken;

        const payload = jwt.decode(action.payload.accessToken);
        draft.user.email = payload.sub;
        break;
      }

      case LOGIN_FAILURE: {
        draft.loading = false;
        draft.message = action.payload.message;

        draft.isLoggedIn    = false;
        draft.isLoginFailed = true;

        window.localStorage.clear();
        break;
      }

      case CLEAR: {
        draft.message = '';
        draft.isLoginFailed = false;
        break;
      }
    }
  });
}
