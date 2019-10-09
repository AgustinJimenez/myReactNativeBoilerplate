import { SIMPLE_FETCH, SIMPLE_FETCH_SUCCESS, SIMPLE_FETCH_ERROR } from '../actions/types'

let dataSetsInitialState = {
    users: {
        loading: false,
        error: false,
        data: [],
    },
}

let datasetReducer = (state = dataSetsInitialState, action) => {
    let { type, data, error, dataset_name } = action
    //console.log('REDUCERS ===> ', { state, action })
    if (!dataset_name) return state
    //throw 'REDUCER FETCH NAME IS REQUIRED'

    switch (type) {
        case SIMPLE_FETCH:
            state[dataset_name] = { ...state[dataset_name], loading: true, error: false }
            return { ...state }
        case SIMPLE_FETCH_SUCCESS:
            state[dataset_name] = { ...state[dataset_name], data, loading: false, error: false }
            return { ...state }
        case SIMPLE_FETCH_ERROR:
            state[dataset_name] = { ...state[dataset_name], loading: false, error }
            return { ...state }
        default:
            return state
    }
}

export default datasetReducer
