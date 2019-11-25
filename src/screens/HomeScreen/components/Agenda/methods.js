export const getDateFromDatetime = dateTimeString => (dateTimeString || '').substring(0, 10)
export const getTimeFromDatetime = dateTimeString => (dateTimeString || '').substring(11, 16)
export const getAppointments = props => props.appointments.data || []

export const parseAppointmentsForAgenda = appointments => {
    var parsedAppointments = {}

    appointments.map((appointment, key) => {

        if (!!appointment.datetime) {

            appointment.name = appointment.reason
            appointment.key = key
            let index = getDateFromDatetime(appointment.datetime)

            if (!parsedAppointments[index])
                parsedAppointments[index] = []

            parsedAppointments[index].push(appointment)
        }

    })

    return parsedAppointments
}
export const getAppointmentTitleLimited = (str = '') => {
    let limit = 50
    if (str.length >= limit)
        return str.substring(0, limit) + '...'

    return str
}