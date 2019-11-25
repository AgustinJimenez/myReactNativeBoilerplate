import { domain } from './config'

let route = suffix => `${domain}/${suffix}`
export const loginRoute = route('login')
export const syncRoute = id => route(`appointments/${id}/sync`)
export const appointmentRoute = route('appointments')
