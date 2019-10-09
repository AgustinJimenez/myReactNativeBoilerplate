//import {  } from '../actions/types'

let dataSetsInitialState = {
    token: null,
}

let authReducer = (state = dataSetsInitialState, action) => {
    let { type } = action
    switch (type) {
        /* case SIMPLE_FETCH:
            state[dataset_name] = { ...state[dataset_name], loading: true, error: false }
            return { ...state }
        case SIMPLE_FETCH_SUCCESS:
            state[dataset_name] = { ...state[dataset_name], data, loading: false, error: false }
            return { ...state }
        case SIMPLE_FETCH_ERROR:
            state[dataset_name] = { ...state[dataset_name], loading: false, error }
            return { ...state } */
        default:
            return state
    }
}

export default authReducer
