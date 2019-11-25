import { SIMPLE_FETCH, SET_ON_DATASET, PUSH_TO_DATASET_LIST, UPDATE_TO_DATASET_LIST, DELETE_DATASET_LIST } from './types'
import { loginRoute, appointmentRoute } from '../api/routes'
import NavigationService from '../app/NavigationService'
import { errorsDatasetInitialState, loadingDatasetInitialState } from '../reducers/datasetReducer'


export const fetchUsers = _ => ({
    type: SIMPLE_FETCH,
    dataset_name: 'users',
    options: {
        url: 'https://jsonplaceholder.typicode.com/users',
    },
})

export const fetchAppointments = _ => ({
    type: SIMPLE_FETCH,
    dataset_name: 'appointments',
    options: {
        url: appointmentRoute,
    },
})

export const syncAppointment = params => ({
    type: SIMPLE_FETCH,
    useDataset: false,
    parseData: ({ data }) => {
        //let { t } = useTranslation()
        let parseData = {
            ...data
        }
        console.log('syncAppointment action ===> ', parseData)
        return parseData
    },
    options: {
        url: syncRoute(params.id),
        params,
        method: 'POST',
    },
})

export const fetchAuth = params => ({
    type: SIMPLE_FETCH,
    dataset_name: 'auth',
    showResponseMessage: true,
    onSuccess: _ => {
        NavigationService.navigate('Home')
    },
    parseData: ({ data }) => {
        //let { t } = useTranslation()
        let parseData = {
            //message: t('welcome') + ` ${data.username}`,
            token: data.access_token,
            avatar: data.avatar,
            username: data.username,
            branch_name: data.name,
        }
        return parseData
    },
    options: {
        url: loginRoute,
        params,
        method: 'POST',
    },
})

export const resetAppLoadings = _ => ({
    type: SET_ON_DATASET,
    dataset_name: '_loading',
    data: loadingDatasetInitialState,
})

export const resetAppErrors = _ => ({
    type: SET_ON_DATASET,
    dataset_name: '_error',
    data: errorsDatasetInitialState,
})

export const logout = _ => ({
    type: SET_ON_DATASET,
    dataset_name: 'auth',
    data: { token: null },
})

export const setLang = lang_id => ({
    type: SET_ON_DATASET,
    dataset_name: 'lang',
    data: lang_id,
})
export const setHoursBeforeAppointmentNotification = hours => ({
    type: SET_ON_DATASET,
    dataset_name: 'hours_before_appointment_notification',
    data: hours,
})
export const setOthers = others => ({
    type: SET_ON_DATASET,
    dataset_name: 'others',
    data: others,
})

export const pushNewItemToDatasetList = (data, dataset_name) => ({
    type: PUSH_TO_DATASET_LIST,
    dataset_name,
    data,
})

export const updateItemToDatasetList = (data, dataset_name) => ({
    type: UPDATE_TO_DATASET_LIST,
    dataset_name,
    data,
})

export const deleteItemFromDatasetList = (data, dataset_name) => ({
    type: DELETE_DATASET_LIST,
    dataset_name,
    data,
})