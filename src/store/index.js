import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {createLogger} from 'redux-logger';
// Imports: Redux Root Reducer
import rootReducer from '../reducers';
// Imports: Redux Root Saga
import rootSagas from '../sagas';
// Middleware: Redux Sagas
const sagaMiddleware = createSagaMiddleware();
// Redux: Store
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, createLogger()),
);
// Middleware: Redux Saga
sagaMiddleware.run(rootSagas);
// Exports
export {store};
