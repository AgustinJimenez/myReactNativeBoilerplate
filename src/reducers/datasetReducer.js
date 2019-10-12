import { SIMPLE_FETCH, SIMPLE_FETCH_SUCCESS, SIMPLE_FETCH_ERROR } from '../actions/types'

let dataSetsInitialState = {
    _loading: {
        users: false,
    },
    _error: {
        users: null,
    },
    users: [],
    appointments: [],
}

let datasetReducer = (state = dataSetsInitialState, action) => {
    let { type, data, error, dataset_name } = action
    //console.log('REDUCERS ===> ', { state, action })
    if (!dataset_name) return state
    //throw 'REDUCER FETCH NAME IS REQUIRED'

    switch (type) {
        case SIMPLE_FETCH:
            state['_loading'][dataset_name] = true
            state['_error'][dataset_name] = false
            return { ...state }
        case SIMPLE_FETCH_SUCCESS:
            state['_loading'][dataset_name] = false
            state['_error'][dataset_name] = false
            state[dataset_name] = data
            return { ...state }
        case SIMPLE_FETCH_ERROR:
            state['_loading'][dataset_name] = false
            state['_error'][dataset_name] = error
            return { ...state }
        default:
            return state
    }
}

export default datasetReducer
