import { combineReducers } from 'redux'
import { fetchToDataset } from '../reducers/datasetReducer'

export default combineReducers({
    datasets: fetchToDataset,
})
