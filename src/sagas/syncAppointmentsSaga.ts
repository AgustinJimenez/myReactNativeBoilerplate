import { select, put } from 'redux-saga/effects'
import { outOfSyncAppointmentsSelector, othersSelector } from '../selectors/datasetsSelector'
import { SYNC_APPOINTMENTS_SAGAS, SYNC_APPOINTMENT_SAGA } from '../actions/types'
import { syncAppointmentAction, logAction } from '../actions'
import { takeLatest } from 'redux-saga/effects'
import { setOthersDatasetAction, syncAppointmentsNotificationsSagaAction } from '../actions'
import { formatDate } from '../utils/dateFormat'
import Appointment from '../models/Appointment'

export function* appointmentsSync({ onFinishCallback = () => {} }: any) {
    let others = yield select(othersSelector)
    others.appointmentsAreSynchronizing = true
    yield put(setOthersDatasetAction(others))
    yield put(logAction(`APPOINTMENTS-SYNC-SAGA`))
    let rawAppointments = yield select(outOfSyncAppointmentsSelector)
    for (let appointment of rawAppointments) {
        yield put(syncAppointmentAction(new Appointment(appointment)))
    }

    /* 
        let notificationConfig = {
            id: appointment.id_on_device,
            title: `${i18n.t('notice_of_appointment_at')}: ${formatDate(appointment.datetime, hoursMinutesFormat)}`,
            message: appointment.reason,
            date: convertToDate(appointment.notification_date),
        }
        PushNotification.cancelLocalNotifications({ id: notificationConfig.id })
        //console.log('NotificationPerAppointmentTask ===> ', { appointment, notificationConfig })
        PushNotification.localNotificationSchedule(notificationConfig)
     */
    others.appointmentsAreSynchronizing = false
    yield put(setOthersDatasetAction(others))
    if (!!onFinishCallback) onFinishCallback()
    yield put(syncAppointmentsNotificationsSagaAction())
}

export default function* syncAppointmentsSaga() {
    yield takeLatest(SYNC_APPOINTMENTS_SAGAS, appointmentsSync)
}
