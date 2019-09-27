import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
// Imports: Redux Root Reducer
import reducers from '../reducers'
// Imports: Redux Root Saga
import sagas from '../sagas'
// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware()
// Redux: Store
const store = createStore(
    reducers,
    applyMiddleware(
        sagaMiddleware,
        createLogger(),
    ),
);
// Middleware: Redux Saga
sagaMiddleware.run(sagas)
// Exports
export {
    store,
}