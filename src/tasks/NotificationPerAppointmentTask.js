
import PushNotification from "react-native-push-notification"
import { othersSelector, appointmentsSelector } from '../selectors/datasetsSelector'
import BackgroundFetch from "react-native-background-fetch"
import { store } from '../app/store'
import moment from 'moment'

const NotificationPerAppointmentTask = async _ => {
    let state = store.getState()
    let appointments = appointmentsSelector(state).data

    if (!!appointments.length && appointments.length)
        appointments.map(appointment => {
            let resultLangMoment = moment.locale('es')
            let dateTimeForNotification = moment(appointment.datetime).subtract(4, 'hours').toDate()

            /* 
            PushNotification.localNotificationSchedule({
                id: appointment.id_on_device,
                title: 'AVISO',
                message: 'Some rare message',
                date: 
            })
            */
            console.log('HERE ====> ', { yes, diffInHours })
        })
}

export default NotificationPerAppointmentTask