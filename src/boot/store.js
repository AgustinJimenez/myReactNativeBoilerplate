import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// Imports: Redux Store
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@react-native-community/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import { createLogger } from 'redux-logger'
// Imports: Redux Root Reducer
import rootReducer from './reducers'
// Imports: Redux Root Saga
import rootSagas from './sagas'
// Middleware: Redux Sagas
const sagaMiddleware = createSagaMiddleware()
// Redux: Store

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['navigation'], // navigation will not be persisted
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware, createLogger()))
const persistor = persistStore(store)
// Middleware: Redux Saga
sagaMiddleware.run(rootSagas)
// Exports
export { store, persistor }
