import { SYNC_APPOINTMENTS_NOTIFICATIONS_SAGA } from '../actions/types'
import { takeEvery, select, put } from 'redux-saga/effects'
import { setNotificationSagaAction /* logAction */ } from '../actions'
import { unfinishedRawAppointmentsSelector, hoursBeforeAppointmentNotificationSelector } from '../selectors/datasetsSelector'
import notificationsSelector from '../selectors/notificationsSelector'
import PushNotification from 'react-native-push-notification'
import i18n from '../app/i18n'
import moment from 'moment'

//import { dateForUsersFormat, formatDate, hoursMinutesFormat, convertToDate } from '../utils/dateFormat'
export function* syncAppointmentsNotifications({ afterFinishCallback }: any) {
    var notifications = yield select(notificationsSelector)
    let unfinishedAppointments = yield select(unfinishedRawAppointmentsSelector)
    let hoursBeforeAppointment = yield select(hoursBeforeAppointmentNotificationSelector)
    unfinishedAppointments = unfinishedAppointments.filter((a: any) => {
        let dateOfNotification = a.dateTimeInMoment.subtract(hoursBeforeAppointment, 'hours').toDate()
        let nowIsInRange = moment().isSameOrAfter(dateOfNotification) && moment().isSameOrBefore(a.dateTimeInMoment)
        let isValid = nowIsInRange && !notifications[a.id_on_device]
        return isValid
    })
    for (let appointment of unfinishedAppointments) {
        let dateOfNotification = appointment.dateTimeInMoment.subtract(hoursBeforeAppointment, 'hours').toDate()
        //let dateOfAppointmentFormated = appointment.getDateTimeFormated
        //let dateOfNotificationFormated = moment(dateOfNotification).format(dateForUsersFormat)
        let notification = {
            //id: appointment.id,
            title: `${i18n.t('notice_of_appointment_at')}: ${appointment.getTimeFormated}`,
            message: `${i18n.t('client')}: ${appointment.clientName}`,
            //date: dateOfNotification,
            userInfo: appointment.getDatas() || {},
        }
        //console.log('syncAppointmentsNotifications ===> ', { notification })
        yield put(setNotificationSagaAction(notification))
        yield PushNotification.localNotification(notification)
    }
}

export default function* syncAppointmentsNotificationsSaga() {
    yield takeEvery(SYNC_APPOINTMENTS_NOTIFICATIONS_SAGA, syncAppointmentsNotifications)
}
/* 
import { othersSelector, appointmentsSelector, notificationsSelector } from '../selectors/datasetsSelector'
import { store } from '../app/store'

import i18n from '../app/i18n'
*/
/* 
    let state = store.getState()
    //let notifications = notificationsSelector(state)


    })
    */
