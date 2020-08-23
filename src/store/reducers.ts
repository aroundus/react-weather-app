import { combineReducers } from 'redux';

import { auth } from 'store/auth/reducers';
import { app } from 'store/app/reducers';

const reducers = combineReducers({
  auth,
  app
});

export type State = ReturnType<typeof reducers>;

export default reducers;
