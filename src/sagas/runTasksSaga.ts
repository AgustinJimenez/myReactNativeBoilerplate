import { RUN_TASKS_SAGA } from '../actions/types'
import { takeEvery, put } from 'redux-saga/effects'
import { syncAppointmentsAction } from '../actions'
//import { formatDate } from '../utils/dateFormat'

export function* runTasks({ afterFinishCallback }: any) {
    //console.log(`\n<=============================\nRUNNING-TASKS - ${formatDate(new Date(), 'HH:mm:ss.SSSS')}\n=============================>\n`)
    yield put(syncAppointmentsAction())
    //console.log(`\n<=============================\nENDING-TASKS - ${formatDate(new Date(), 'HH:mm:ss.SSSS')}\n=============================>\n`)
    if (!!afterFinishCallback) afterFinishCallback()
}

export default function* syncAppointmentSaga() {
    yield takeEvery(RUN_TASKS_SAGA, runTasks)
}
