import { domain, domain_test } from './config'

let route = (suffix: string) => `${domain}/${suffix}`
let route_test = (suffix: string) => `${domain_test}/${suffix}`

export const loginRoute: string = route('login')
export const syncRoute: string = route_test(`sync`)
export const appointmentStructureRoute: string = route_test(`sync/structure`)
export const reasonsRoute: string = route('administration/items')
export const userInfoRoute: string = route(`administration/users`)
export const clientsRoute: string = route(`administration/peoples`)
export const schedulingsRoute: string = route_test(`schedulings`)
export const appointmentsRoute: string = route_test('appointments')
export const startRoute: string = route_test('start')
export const finishRoute: string = route_test('finish')
