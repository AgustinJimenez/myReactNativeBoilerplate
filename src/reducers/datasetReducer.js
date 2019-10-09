import { SIMPLE_FETCH, SIMPLE_FETCH_SUCCESS, SIMPLE_FETCH_ERROR } from '../actions/types'

let dataSetsInitialState = {
    users: {
        loading: false,
        error: false,
        data: [],
    },
}

let fetchToDataset = (state = dataSetsInitialState, action) => {
    let { type, data, error, dataset_name } = action
    //console.log('REDUCERS ===> ', { state, action })
    if (!dataset_name) return state
    //throw 'REDUCER FETCH NAME IS REQUIRED'

    switch (type) {
        case SIMPLE_FETCH:
            //console.log('BEFORE-MERGE: SIMPLE_FETCH - ', { state })
            state[dataset_name] = { ...state[dataset_name], loading: true, error: false }
            //console.log('AFTER-MERGE: SIMPLE_FETCH - ', { state })
            return state
        case SIMPLE_FETCH_SUCCESS:
            //console.log('BEFORE-MERGE: SIMPLE_FETCH_SUCCESS - ', { state })
            state[dataset_name] = { ...state[dataset_name], data, loading: false, error: false }
            //console.log('AFTER-MERGE: SIMPLE_FETCH_SUCCESS - ', { state })
            return state
        case SIMPLE_FETCH_ERROR:
            //console.log('BEFORE-MERGE: SIMPLE_FETCH_ERROR - ', { state })
            state[dataset_name] = { ...state[dataset_name], loading: false, error }
            //console.log('AFTER-MERGE: SIMPLE_FETCH_ERROR - ', { state })
            return state
        default:
            return state
    }
}

export { fetchToDataset }
