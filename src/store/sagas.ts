import { all } from 'redux-saga/effects';

import auth from 'store/auth/sagas';
import app from 'store/app/sagas';

export default function* saga() {
  return yield all([
    auth,
    app
  ]);
}
