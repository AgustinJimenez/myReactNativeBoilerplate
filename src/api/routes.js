import { domain } from './config'

let route = suffix => `${domain}/${suffix}`
export const loginRoute = route('login')
export const appointmentRoute = route('appointments')
