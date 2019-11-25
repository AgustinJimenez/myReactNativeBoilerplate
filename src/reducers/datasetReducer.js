import { DELETE_DATASET_LIST, UPDATE_TO_DATASET_LIST, PUSH_TO_DATASET_LIST, SIMPLE_FETCH, SIMPLE_FETCH_SUCCESS, SIMPLE_FETCH_ERROR, SET_ON_DATASET, default as ACTION_TYPES } from '../actions/types'

export let loadingDatasetInitialState = {
    users: false,
    appointments: false,
    auth: false,
    lang: false
}
export let errorsDatasetInitialState = {
    users: null,
    appointments: null,
    auth: null,
    lang: null,
}
export let appDatasetInitialState = {
    users: [],
    appointments: [],
    auth: {
        token: null,
        avatar: null,
        username: null,
        branch_name: null,
    },
    lang: 'es',
    hours_before_appointment_notification: 4,
    others: {
        logs: [],
        username: '',
        appointmentsAreSynchronizing: false,
        network: {
            isConnected: false,
            type: null,
            isInternetReachable: false,
            details: {
                ipAddress: null,
                isConnectionExpensive: false,
                subnet: null,
            },
        },
    },
}
let dataSetsInitialState = {
    _loading: loadingDatasetInitialState,
    _error: errorsDatasetInitialState,
    ...appDatasetInitialState,
}

let datasetReducer = (state = dataSetsInitialState, action) => {
    let { type, data, error, dataset_name } = action
    //console.log('REDUCERS - datasetReducer ===> ', { type, state, error, action, dataset_name })
    if (!dataset_name && !!ACTION_TYPES[type]) {
        console.error('DATASET NAME NAME IS REQUIRED', { type })
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
            if (typeof data === 'object') {
                state[dataset_name] = { ...state[dataset_name], ...data }
            } else {
                state[dataset_name] = data
            }
            return { ...state }
        case PUSH_TO_DATASET_LIST:
            state[dataset_name].push(data)
            return { ...state }

        case UPDATE_TO_DATASET_LIST:
            state[dataset_name] = state[dataset_name].map(datasetData => {

                if (datasetData['id_on_device'] === data['id_on_device'])
                    datasetData = data

                return datasetData
            })
            return { ...state }

        case DELETE_DATASET_LIST:

            state[dataset_name] = state[dataset_name].filter(datasetData =>
                datasetData['id_on_device'] !== data['id_on_device']
            )

            return { ...state }

        default:
            return state
    }
}

export default datasetReducer
