import { SIMPLE_FETCH, SIMPLE_FETCH_SUCCESS, SIMPLE_FETCH_ERROR, SET_ON_DATASET } from '../actions/types'

let dataSetsInitialState = {
    _loading: {
        users: false,
        appointments: false,
        auth: false,
        lang: false,
    },
    _error: {
        users: null,
        appointments: null,
        auth: null,
        lang: null,
    },
    users: [],
    appointments: [],
    auth: {},
    lang: 'es',
}

let datasetReducer = (state = dataSetsInitialState, action) => {
    let { type, data, error, dataset_name } = action
    //console.log('REDUCERS - datasetReducer ===> ', { type, state, error, action, dataset_name })
    if (!dataset_name) {
        //console.warn('REDUCER FETCH NAME IS REQUIRED', { state, action, dataset_name })
        return state
    }
    //throw 'REDUCER FETCH NAME IS REQUIRED'

    switch (type) {
        case SIMPLE_FETCH:
            state['_loading'][dataset_name] = true
            state['_error'][dataset_name] = false
            return { ...state }

        case SIMPLE_FETCH_SUCCESS:
            state['_loading'][dataset_name] = false
            state['_error'][dataset_name] = false
            state[dataset_name] = { ...state[dataset_name], ...data }
            return { ...state }

        case SIMPLE_FETCH_ERROR:
            state['_loading'][dataset_name] = false
            state['_error'][dataset_name] = error
            return { ...state }

        case SET_ON_DATASET:
            if (typeof data === 'object') state[dataset_name] = { ...state[dataset_name], ...data }
            else state[dataset_name] = data

            return { ...state }

        default:
            return state
    }
}

export default datasetReducer
