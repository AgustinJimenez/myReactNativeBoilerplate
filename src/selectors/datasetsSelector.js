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
export const authSelector = state => getDataset(state, 'auth')
export const langSelector = state => getDataset(state, 'lang')
export const hoursBeforeAppointmentNotificationSelector = state => getDataset(state, 'hours_before_appointment_notification')
export const othersSelector = state => getDataset(state, 'others')
export const networkSelector = state => getDataset(state, 'network')
