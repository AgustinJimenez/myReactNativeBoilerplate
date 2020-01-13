import { put, call } from 'redux-saga/effects'
import { DELETE_APPOINTMENT_SAGA } from '../actions/types'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../utils/showToast'
import { schedulingsRoute, appointmentsRoute } from '../api/routes'
import NavigationService from '../app/NavigationProvider/service'
import request from './request'

export function* deleteAppointment(appointment: any, onFinishCallback: Function = () => {}) {
    var { data, error, message } = yield call(request, {
        url: schedulingsRoute,
        params: appointment,
        method: 'POST',
    })

    //yield showToast(message, { type: 'success' })
    //NavigationService.navigate('Home', {})
    //yield put({ type: SET_ON_DATASET_REDUCER, dataset_name: 'auth', data: authDatasetData })
    //onFinishCallback()
}

export default function* deleteAppointmentSaga() {
    yield takeLatest(DELETE_APPOINTMENT_SAGA, deleteAppointment)
}
