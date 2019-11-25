import { combineReducers } from 'redux'
import datasetReducer from '../reducers/datasetReducer'

export default combineReducers({
    datasets: datasetReducer,
})
