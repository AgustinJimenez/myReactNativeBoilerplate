import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { show_redux_logs } from '../../env.json'
// Imports: Redux Store
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@react-native-community/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
// Imports: Redux Root Reducer
import rootReducer from '../reducers'
// Imports: Redux Root Saga
import rootSagas from '../sagas'
// Middleware: Redux Sagas
const sagaMiddleware = createSagaMiddleware()
// Redux: Store
//import customReduxMiddleware from './customReduxMiddleware'

import { composeWithDevTools } from 'redux-devtools-extension'

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage,
        timeout: null,
        stateReconciler: autoMergeLevel2,
        blacklist: ['navigation'], // navigation will not be persisted
    },
    rootReducer,
)

let middlewares = [sagaMiddleware /* , customReduxMiddleware */]
if (show_redux_logs && process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`)
    middlewares.push(logger)
}
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)))
const persistor = persistStore(store)
// Middleware: Redux Saga
sagaMiddleware.run(rootSagas)
// Exports
export { store, persistor }
