import { domain } from './config'

let route = suffix => `${domain}/${suffix}`

export const loginRoute = route('auth')
