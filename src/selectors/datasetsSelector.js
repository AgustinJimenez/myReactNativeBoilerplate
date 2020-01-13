import Appointment from '../models/Appointment'
import Notification from '../models/Notification'

const getDataset = (state, datasetName) => {
    let dataset = state['datasets'][datasetName]
    return dataset
}
export const persistSelector = state => {
    return (
        state['_persist'] || {
            version: null,
            rehydrated: false,
        }
    )
}
export const rawAppointmentsSelector = state => {
    return getDataset(state, 'appointments') || []
}
export const rawAppointmentsObjectSelector = state => {
    let appointments = getDataset(state, 'appointments') || []
    let appointmentsObj = {}
    appointments.map(appointment => {
        appointmentsObj[appointment['id_on_device']] = appointment
    })
    return appointmentsObj
}
export const unfinishedRawAppointmentsSelector = state => {
    let rawAppointments = rawAppointmentsSelector(state)
    var clients = clientsSelector(state)
    let unfinishedRawAppointments = rawAppointments.filter(({ current_step }) => !!current_step)
    let appointments = unfinishedRawAppointments.map(unfinishedRawAppointment => {
        let appointment = new Appointment(unfinishedRawAppointment)
        clients.some(client => {
            if (client.id === appointment.client_id) {
                appointment.client = client
                return true
            }
        })
        return appointment
    })
    return appointments || []
}
export const appointmentsSelector = state => {
    let rawAppointments = rawAppointmentsSelector(state)
    let appointments = rawAppointments.map(rawAppointment => new Appointment(rawAppointment))
    return appointments || []
}
export const appointmentsWithClientSelector = state => {
    let rawAppointments = rawAppointmentsSelector(state)
    var clients = clientsSelector(state)
    let appointments = rawAppointments.map(rawAppointment => {
        let appointment = new Appointment(rawAppointment)
        clients.some(client => {
            if (client.id === appointment.client_id) {
                appointment.client = client
                return true
            }
        })
        return appointment
    })
    //console.log('appointmentsWithClientSelector FINISH ===> ', { rawAppointments, clients, appointments })
    return appointments || []
}
export const outOfSyncAppointmentsSelector = state => {
    let rawAppointments = rawAppointmentsSelector(state) || []
    let outOfSyncRawAppointments = rawAppointments.filter(({ sync }) => !sync) || []
    //let appointments = outOfSyncRawAppointments.map(rawAppointment => new Appointment(rawAppointment))
    return outOfSyncRawAppointments || []
}
export const clientsSelector = state => {
    let datasetName = 'clients'
    return Object.keys(state[datasetName]).map(id => state[datasetName][id]) || []
}
export const appointmentStructureSelector = state => getDataset(state, 'appointment_structure') || {}
export const reasonsSelector = state => {
    let datasetName = 'reasons'
    return Object.keys(state[datasetName]).map(id => state[datasetName][id]) || []
}
export const appointmentSelector = (state, data) => {
    var appointment = {}
    let rawAppointments = rawAppointmentsSelector(state)
    var clients = clientsSelector(state)
    rawAppointments.some(rawAppointment => {
        if (rawAppointment['id_on_device'] === data['id_on_device']) {
            appointment = new Appointment(rawAppointment)
            return true
        }
    })
    clients.some(client => {
        if (appointment.client_id === client.id) {
            appointment.client = client
            return true
        }
    })
    //console.log('HERE ===> ', { appointment, clients })
    return appointment
}
export const authSelector = state => getDataset(state, 'auth')
export const langSelector = state => getDataset(state, 'lang')
export const hoursBeforeAppointmentNotificationSelector = state => getDataset(state, 'hours_before_appointment_notification')
export const othersSelector = state => getDataset(state, 'others')
export const networkSelector = state => getDataset(state, 'network')
