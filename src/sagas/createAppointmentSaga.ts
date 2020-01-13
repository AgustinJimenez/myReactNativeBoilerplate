import { put } from 'redux-saga/effects'
import { CREATE_APPOINTMENT_SAGA } from '../actions/types'
import { pushNewItemToDatasetListAction } from '../actions'
import { takeLatest } from 'redux-saga/effects'

export function* createAppointment({ appointment, afterFinishCallback }: any) {
    yield put(pushNewItemToDatasetListAction(appointment, 'appointments'))
    afterFinishCallback()
}

export default function* createAppointmentSaga() {
    yield takeLatest(CREATE_APPOINTMENT_SAGA, createAppointment)
}
