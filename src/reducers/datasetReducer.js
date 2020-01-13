import { DELETE_DATASET_LIST_REDUCER, UPDATE_TO_DATASET_LIST_REDUCER, PUSH_TO_DATASET_LIST_REDUCER, SET_ON_DATASET_REDUCER } from '../actions/types'
import initialState from './initialState'
const debug = false
let datasetReducer = (state = initialState, action) => {
    let { type, data, dataset_name } = action
    if (debug) console.log('REDUCERS - datasetReducer ===> ', { action })
    //throw 'REDUCER FETCH NAME IS REQUIRED'

    switch (type) {
        case SET_ON_DATASET_REDUCER:
            if (typeof data !== 'object' || Array.isArray(data)) state[dataset_name] = data
            else {
                state[dataset_name] = { ...state[dataset_name], ...data }
            }

            state = { ...state }
            break

        case PUSH_TO_DATASET_LIST_REDUCER:
            state[dataset_name].push(data)
            state = { ...state }
            break

        case UPDATE_TO_DATASET_LIST_REDUCER:
            state[dataset_name] = state[dataset_name].map(datasetData => {
                if (datasetData['id_on_device'] === data['id_on_device']) {
                    //console.log('UPDATING HERE =====> ', { data, datasetData })
                    datasetData = data
                }
                return datasetData
            })
            state = { ...state }
            break
        case DELETE_DATASET_LIST_REDUCER:
            state[dataset_name] = state[dataset_name].filter(datasetData => datasetData['id_on_device'] !== data['id_on_device'])

            state = { ...state }
            break
    }
    return state
}

//export default Reducer(datasetReducer)
export default datasetReducer
