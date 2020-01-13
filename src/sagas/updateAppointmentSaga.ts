import { put } from 'redux-saga/effects'
import { UPDATE_APPOINTMENT_SAGA } from '../actions/types'
import { updateItemToDatasetList } from '../actions'
import { takeLatest } from 'redux-saga/effects'
/* 
import showToast from '../utils/showToast'
import { schedulingsRoute, appointmentsRoute } from '../api/routes'
import NavigationService from '../app/NavigationService'
import request from './request'
*/
export function* updateAppointment({ appointment, afterFinishCallback }: any) {
    //console.log('updateAppointment ===> ', { appointment, afterFinishCallback })
    yield put(updateItemToDatasetList(appointment, 'appointments', afterFinishCallback))
    /* 
    var { data, error, message } = yield request({
        url: schedulingsRoute,
        params: appointment,
        method: 'POST',
    }) 
    */

    //yield showToast(message, { type: 'success' })
    //NavigationService.navigate('Home', {})
    if (!!afterFinishCallback) afterFinishCallback()
}

export default function* updateAppointmentSaga() {
    yield takeLatest(UPDATE_APPOINTMENT_SAGA, updateAppointment)
}
