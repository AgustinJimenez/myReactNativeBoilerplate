import { SIMPLE_FETCH, SET_ON_DATASET } from './types'
import { loginRoute, appointmentRoute } from '../api/routes'
import NavigationService from '../boot/navigationService'

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

export const fetchAuth = params => ({
    type: SIMPLE_FETCH,
    dataset_name: 'auth',
    showResponseMessage: true,
    onSuccess: _ => {
        NavigationService.navigate('Home')
    },
    parseData: data => ({ token: data.token }),
    options: {
        url: loginRoute,
        params,
        method: 'POST',
    },
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
