import { SIMPLE_FETCH, LOGIN, LOGOUT } from './types'
import { loginRoute } from '../api/routes'

export const fetchUsers = _ => ({
    type: SIMPLE_FETCH,
    dataset_name: 'users',
    options: {
        url: 'https://jsonplaceholder.typicode.com/users',
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
