import { SIMPLE_FETCH } from './types'

export const fetchUsers = {
    type: SIMPLE_FETCH,
    dataset_name: 'users',
    options: {
        url: 'https://jsonplaceholder.typicode.com/users',
    },
}
