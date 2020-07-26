import { put, takeLatest } from 'redux-saga/effects'
import { LOGOUT_SAGA } from '../actions/types'
import {
    clearAuthAction,
    clearNotificationsReducerAction,
    setAppointmentsDatasetAction,
    clearReasonsReducerAction,
    clearClientsReducerAction,
    setAppointmentStructureDatasetAction,
} from '../actions'

function* logout() {
    yield put(clearAuthAction())
    yield put(setAppointmentsDatasetAction([]))
    yield put(clearReasonsReducerAction())
    yield put(clearClientsReducerAction())
    yield put(clearNotificationsReducerAction())
}

export default function* logoutSaga() {
    yield takeLatest(LOGOUT_SAGA, logout)
}
