import { FETCH_APPOINTMENTS_SAGAS } from '../actions/types'
import { setAppointmentsDatasetAction, syncAppointmentsAction, fetchAppointmentStructureAction } from '../actions'
import { syncRoute } from '../api/routes'
import { takeLatest, select, put, call } from 'redux-saga/effects'
import request from './request'
import { rawAppointmentsSelector } from '../selectors/datasetsSelector'
//import showToast from '../utils/showToast'
import Appointment from '../models/Appointment'

export function* fetchAppointments({ onFinishCallback = () => {} }: any) {
    try {
        yield put(fetchAppointmentStructureAction())
        yield put(syncAppointmentsAction())
        var { data, error, message, response = {} } = yield call(request, {
            url: syncRoute,
            //debug: true,
        })
        var fetchedAppointments: Array<any> = data || response.data
        if (error || !Array.isArray(fetchedAppointments)) {
            onFinishCallback()
            //yield showToast(message, { type: 'danger' })
            return
        }
        var fetchedAppointmentsObj: any = {}
        var localAppointmentsObj: any = {}
        fetchedAppointments
            .filter(({ appointment_date, current_step }: any) => !!appointment_date)
            .map((fa: any) => {
                fetchedAppointmentsObj[fa.id] = { ...fa, sync: true, syncronizing: false }
            })
        //.map((fa: any) => new Appointment({ ...fa, sync: true }).getDatas())
        var localAppointments = yield select(rawAppointmentsSelector)
        localAppointments.map((la: any) => {
            if (!!la.id) localAppointmentsObj[la.id] = la
            else if (!!la.id_on_device) localAppointmentsObj[la.id_on_device] = la
        })
        var refreshedAppointments: any = []
        Object.keys(fetchedAppointmentsObj).map((id: any) => {
            let data: any = {}
            data = { ...new Appointment(fetchedAppointmentsObj[id]) }
            if (!!localAppointmentsObj[id] && !!localAppointmentsObj[id]['id_on_device']) {
                data['id_on_device'] = localAppointmentsObj[id]['id_on_device']
            }
            refreshedAppointments.push(data)
        })
        Object.keys(localAppointmentsObj).map((idOrLocalId: any) => {
            if (!localAppointmentsObj[idOrLocalId].sync) {
                refreshedAppointments.push(localAppointmentsObj[idOrLocalId])
            }
        })
        //console.log('FETCHED ===> ', { refreshedAppointments })
        yield put(setAppointmentsDatasetAction(refreshedAppointments))
        onFinishCallback()
    } catch (error) {
        //console.log('FETCH-APPOINTMENTS-ERROR ===> ', error)
        onFinishCallback()
    } finally {
    }
}

export default function* fetchAppointmentsSagas() {
    yield takeLatest(FETCH_APPOINTMENTS_SAGAS, fetchAppointments)
}
