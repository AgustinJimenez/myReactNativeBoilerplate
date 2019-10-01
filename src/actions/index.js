import { FETCH } from './types'

export const fetch = _ => ({
    type: FETCH,
    options: {
        url: 'https://jsonplaceholder.typicode.com/users',
    },
})
