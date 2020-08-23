import { compose, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducers from 'store/reducers';
import sagas from 'store/sagas';

const sagaMiddleware = createSagaMiddleware();

const composer = process.env.REACT_APP_NODE_ENV == 'production'
  ? compose(applyMiddleware(sagaMiddleware))
  : composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(reducers, composer);

sagaMiddleware.run(sagas);

export default store;
