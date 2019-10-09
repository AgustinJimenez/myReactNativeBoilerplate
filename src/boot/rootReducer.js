import { combineReducers } from 'redux'
import datasetReducer from '../reducers/datasetReducer'
import authReducer from '../reducers/authReducer'

export default combineReducers({
    datasets: datasetReducer,
    auth: authReducer,
})
