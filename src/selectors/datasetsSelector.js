import Appointment from '../models/Appointment'

const getDataset = (state, datasetName) => {
    let dataset = {
        error: state['datasets']['_error'][datasetName],
        loading: state['datasets']['_loading'][datasetName],
        data: state['datasets'][datasetName],
    }

    //console.log('SELECTOR getDataset ===> ', { state, datasetName, dataset })
    return dataset
}
export const usersSelector = state => getDataset(state, 'users')
export const appointmentsSelector = state => {
    let dataset = getDataset(state, 'appointments')
    dataset.data = dataset.data.map(appointment => new Appointment(appointment))
    return dataset || []
}
export const appointmentSelector = (state, data) => {
    if (!data)
        throw 'SINGLE "appointmentSelector" SELECTOR, DATA UNDEFINED'
    var appointment
    let rawAppointments = getDataset(state, 'appointments').data

    rawAppointments.every(datasetAppointment => {
        if (datasetAppointment['id_on_device'] === data['id_on_device']) {
            appointment = new Appointment(datasetAppointment)
            return false
        }
        return true
    })

    return appointment
}
export const authSelector = state => getDataset(state, 'auth')
export const langSelector = state => getDataset(state, 'lang')
export const hoursBeforeAppointmentNotificationSelector = state => getDataset(state, 'hours_before_appointment_notification')
export const othersSelector = state => getDataset(state, 'others')
