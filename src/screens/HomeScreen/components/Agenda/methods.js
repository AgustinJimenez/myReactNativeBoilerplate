export const getAppointments = props => props.appointments || []
export const parseAppointmentsForAgenda = appointments => {
    var parsedAppointments = {}
    appointments.map((appointment, key) => {
        if (!!appointment['appointment_date']) {
            let index = appointment['date']

            if (!parsedAppointments[index]) parsedAppointments[index] = []

            parsedAppointments[index].push(appointment)
        }
    })
    return parsedAppointments
}
