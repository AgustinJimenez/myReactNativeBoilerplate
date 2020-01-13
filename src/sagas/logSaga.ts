import { takeLatest, select, put } from 'redux-saga/effects'
import { LOG_SAGA } from '../actions/types'
//import showToast from '../utils/showToast'
import { othersSelector } from '../selectors/datasetsSelector'
import { setOthersDatasetAction } from '../actions'
import { formatDate } from '../utils/dateFormat'

function* log({ data = '' }: any) {
    let others = yield select(othersSelector)
    others.logs.unshift(`-${formatDate(new Date(), 'hh:mm:ss')}: ` + data)
    others.logs.splice(20)
    yield put(setOthersDatasetAction(others))
}

export default function* appointmentNotificationWasTappedSaga() {
    yield takeLatest(LOG_SAGA, log)
}
