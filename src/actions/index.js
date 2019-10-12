import { SIMPLE_FETCH, LOGIN, LOGOUT } from './types'
import { loginRoute, appointmentRoute } from '../api/routes'

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

export const login = params => ({
    type: LOGIN,
    options: {
        url: loginRoute,
        params,
        method: 'POST',
    },
})

export const logout = _ => ({
    type: LOGOUT,
})
