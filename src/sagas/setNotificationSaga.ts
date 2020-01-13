import { takeLatest, put } from 'redux-saga/effects'
import { SET_NOTIFICTION_SAGA } from '../actions/types'
import { setNotificationReducerAction } from '../actions'
import moment from 'moment'
import { dateForSystemFormat } from '../utils/dateFormat'
//import showToast from '../utils/showToast'

function* setNotification({ data, afterFinishCallback }: any) {
    yield put(setNotificationReducerAction({ ...data, timestamp: moment().format(dateForSystemFormat) }))
    if (!!afterFinishCallback) afterFinishCallback()
}

export default function* setNotificationSaga() {
    yield takeLatest(SET_NOTIFICTION_SAGA, setNotification)
}
