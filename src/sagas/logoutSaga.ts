import { put, takeLatest } from 'redux-saga/effects'
import { LOGOUT_SAGA } from '../actions/types'
import {
    clearAuthAction,
    clearNotificationsReducerAction,
    setAppointmentsDatasetAction,
    clearReasonsReducerAction,
    clearClientsReducerAction,
} from '../actions'
import NavigationService from '../app/NavigationProvider/service'
function* logout() {
    yield put(clearAuthAction())
    yield put(setAppointmentsDatasetAction([]))
    yield put(clearReasonsReducerAction())
    yield put(clearClientsReducerAction())
    yield put(clearNotificationsReducerAction())
    NavigationService.navigate('Login', {})
}

export default function* logoutSaga() {
    yield takeLatest(LOGOUT_SAGA, logout)
}
