import { put, call, select } from 'redux-saga/effects'
import { FETCH_APPOINTMENT_STRUCTURE_SAGA } from '../actions/types'
import { setAppointmentStructureDatasetAction, setAppointmentsDatasetAction } from '../actions'
import { takeLatest } from 'redux-saga/effects'
import { appointmentStructureRoute } from '../api/routes'
import request from './request'
import { appointmentStructureSelector, rawAppointmentsSelector } from '../selectors/datasetsSelector'
import { OK } from 'http-status-codes'

export function* fetchAppointmentStructure({ onFinishCallback = () => {} }: any) {
    var { data, error, message, response } = yield call(request, {
        url: appointmentStructureRoute,
    })
    if (error || response.status != OK) {
        return
    }
    yield put(setAppointmentStructureDatasetAction(response.data))
    var appointments = yield select(rawAppointmentsSelector)
    let as = yield select(appointmentStructureSelector)
    Object.keys(as['step_informations']).map((stepId: string) => {
        as['step_informations'][stepId].map((field: any, fieldKey: number) => {
            appointments = appointments.map((appointment: any) => {
                let hasfield = false
                appointment['step_informations'][stepId].some(({ name }: any) => {
                    if (name === field.name) hasfield = true
                })
                if (!hasfield) appointment['step_informations'][stepId].push(field)
                return appointment
            })
        })
    })
    //console.log('HERE ===> ', { as })
    yield put(setAppointmentsDatasetAction(appointments))
}

export default function* fetchAppointmentStructureSaga() {
    yield takeLatest(FETCH_APPOINTMENT_STRUCTURE_SAGA, fetchAppointmentStructure)
}
