import { combineReducers } from 'redux'
import datasetReducer from './datasetReducer'
import clientsReducer from './clientsReducer'
import reasonsReducer from './reasonsReducer'
import notificationsReducer from './notificationsReducer'

export default combineReducers({
    datasets: datasetReducer,
    clients: clientsReducer,
    reasons: reasonsReducer,
    notifications: notificationsReducer,
})
