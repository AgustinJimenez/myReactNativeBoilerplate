import { SYNC_APPOINTMENT_SAGA } from '../actions/types'
import { takeEvery, put, select, call } from 'redux-saga/effects'
import request from './request'
import { syncRoute } from '../api/routes'
import { updateAppointmentAction } from '../actions'
import { OK } from 'http-status-codes'
import { appointmentStructureSelector } from '../selectors/datasetsSelector'
import showToast from '../utils/showToast'

export function* appointmentSync({ appointment }: any) {
    let structure = yield select(appointmentStructureSelector)
    yield put(updateAppointmentAction({ ...appointment.getDatas(), syncronizing: true }))
    appointment.mergeOverStructure(structure)
    let options = {
        url: syncRoute,
        data: appointment.getDatas(),
        method: 'POST',
        //debug: true,
    }

    var { data, error, message, response } = yield call(request, options)

    if (response.status !== OK && !!message) yield showToast(message, { type: 'danger' })
    else appointment = { ...appointment.getDatas(), ...response.data }
    yield put(updateAppointmentAction({ ...appointment, sync: !!appointment.id, syncronizing: false }))
}

export default function* syncAppointmentSaga() {
    yield takeEvery(SYNC_APPOINTMENT_SAGA, appointmentSync)
}
