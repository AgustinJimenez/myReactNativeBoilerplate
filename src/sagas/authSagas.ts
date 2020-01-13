import { put, call } from 'redux-saga/effects'
import { AUTH_SAGAS } from '../actions/types'
import { setAuthDatasetAction, setAppointmentsDatasetAction, clearReasonsReducerAction, clearClientsReducerAction } from '../actions'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../utils/showToast'
import { loginRoute, userInfoRoute } from '../api/routes'
import NavigationService from '../app/NavigationProvider/service'
import request from './request'

export function* auth({ name = null, password = null, onFinishCallback = () => {} }: any) {
    var { data, error, message } = yield call(request, {
        url: loginRoute,
        params: { name, password },
        method: 'POST',
    })

    if (error) {
        yield showToast(message, { type: 'danger' })
        onFinishCallback()
        return
    }

    onFinishCallback()
    let authDatasetData = {
        token: data.access_token,
        avatar: data.avatar,
        username: data.username,
        branch_name: data.name,
        people_out_id: null,
    }
    yield put(setAuthDatasetAction(authDatasetData))
    yield showToast(message, { type: 'success' })

    NavigationService.navigate('Home', {})

    var { data, error } = yield call(request, {
        url: userInfoRoute,
        params: { q_username: authDatasetData.username },
        method: 'GET',
    })
    authDatasetData.people_out_id = data['administration/users']['0']['people_id']
    yield put(setAuthDatasetAction(authDatasetData))
}

export default function* authSagas() {
    yield takeLatest(AUTH_SAGAS, auth)
}
