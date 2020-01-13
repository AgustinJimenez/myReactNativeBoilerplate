import { all } from 'redux-saga/effects'
import syncAppointsmentSagas from './syncAppointmentsSaga'
import syncAppointmentSaga from './syncAppointmentSaga'
import changeLanguageSagas from './changeLanguageSagas'
import fetchAppointmentsSagas from './fetchAppointmentsSagas'
import authSagas from './authSagas'
import updateNetworkStatusSagas from './updateNetworkStatusSagas'
import fetchReasonsSagas from './fetchReasonsSagas'
import fetchClientsSaga from './fetchClientsSaga'
import checkInAppointmentSaga from './checkInAppointmentSaga'
import createAppointmentSaga from './createAppointmentSaga'
import updateAppointmentSaga from './updateAppointmentSaga'
import deleteAppointmentSaga from './deleteAppointmentSaga'
import fetchAppointmentStructureSaga from './fetchAppointmentStructureSaga'
import checkNetworkStatusSaga from './checkNetworkStatusSaga'
import runTasksSaga from './runTasksSaga'
import syncAppointmentsNotificationsSaga from './syncAppointmentsNotificationsSaga'
import setNotificationSaga from './setNotificationSaga'
import logoutSaga from './logoutSaga'
import notificationWasTapped from './notificationWasTapped'
import logSaga from './logSaga'

export default function* rootSaga() {
    yield all([
        logSaga(),
        notificationWasTapped(),
        setNotificationSaga(),
        logoutSaga(),
        syncAppointmentsNotificationsSaga(),
        runTasksSaga(),
        checkNetworkStatusSaga(),
        updateNetworkStatusSagas(),
        authSagas(),
        fetchClientsSaga(),
        syncAppointsmentSagas(),
        syncAppointmentSaga(),
        fetchReasonsSagas(),
        changeLanguageSagas(),
        fetchAppointmentsSagas(),
        checkInAppointmentSaga(),
        createAppointmentSaga(),
        updateAppointmentSaga(),
        deleteAppointmentSaga(),
        fetchAppointmentStructureSaga(),
    ])
}
