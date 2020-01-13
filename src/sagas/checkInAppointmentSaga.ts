import { FETCH_APPOINTMENTS_SAGAS } from '../actions/types'
import { appointmentsRoute } from '../api/routes'
import { takeLatest } from 'redux-saga/effects'
import request from './request'
import showToast from '../utils/showToast'

export function* checkInAppointment() {
    /* 
    var { data, error, message, response } = yield request({
        //url: appointmentsRoute,
    })

    let fetchedAppointments = response.data
    fetchedAppointments.map((appointment: any) => {
        //console.log('HERE ===> ', appointment)
    })

    if (error) {
        yield showToast(message, { type: 'danger' })
        return
    }
 */
    //yield put({ type: SET_ON_DATASET_REDUCER, dataset_name: 'network', data: network })
}

export default function* checkInAppointmentSaga() {
    yield takeLatest(FETCH_APPOINTMENTS_SAGAS, checkInAppointment)
}
