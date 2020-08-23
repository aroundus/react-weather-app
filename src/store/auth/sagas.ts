import { AnyAction } from 'redux';
import { all, put, takeLatest } from 'redux-saga/effects';
import Config from 'config';

import {
  LOGIN,
  loginSuccess, loginFailure
} from 'store/auth/actions';

const jwt = require('jsonwebtoken');

export function* login({ payload }: AnyAction) {
  const params = {
    sub: payload.email,
    aud: payload.password
  };

  try {
    const accessToken  = jwt.sign(params, Config.JWT_KEY, { expiresIn: '30d' });
    const refreshToken = jwt.sign(params, Config.JWT_KEY, { expiresIn: '60d' });

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    yield put(loginSuccess(accessToken, refreshToken));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export default all([
  takeLatest(LOGIN, login)
]);
