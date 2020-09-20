import { put /* , call  */ } from 'redux-saga/effects'
import { AUTH_SAGAS } from '../actions/types'
//import { setAuthDatasetAction, setAppointmentsDatasetAction, clearReasonsReducerAction, clearClientsReducerAction } from '../actions'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../utils/showToast'
//import { loginRoute, userInfoRoute } from '../api/routes'
import { base64 as userImage64 } from '../assets/images/user_image.json'

//import request from './request'
import { setDatasetToReducer } from '../redux/actions'

export function* auth({ name = null, password = null, onFinishCallback = () => {} }: any) {
    /* 
    var { data, error, message } = yield call(request, {
        url: loginRoute,
        params: { name, password },
        method: 'POST',
        //debug: true,
    })
    if (error) {
        yield showToast(message, { type: 'danger' })
        onFinishCallback()
        return
    }
    onFinishCallback()
 */
    let authDatasetData: any = {
        token: 'ABC123',
        avatar: userImage64,
        username: name,
    }

    yield put(setDatasetToReducer(authDatasetData, 'auth'))
    yield showToast('hello', { type: 'success' })
}

export default function* authSagas() {
    yield takeLatest(AUTH_SAGAS, auth)
}
