import { put, takeLatest, call } from 'redux-saga/effects'
import { FETCH_REASONS_SAGAS } from '../actions/types'
import { setReasonsReducerAction } from '../actions'
//import showToast from '../utils/showToast'
import { reasonsRoute } from '../api/routes'
import request from './request'

function* fetchReasons({ onFinishCallback = () => {}, searchName, ids = [] }: any) {
    let params: any = {
        q_module_id_id: 6,
    }
    if (!!searchName) params.q_name = searchName
    if (ids.length) params.i_id = ids.join('|')

    var { data, error, message, response } = yield call(request, {
        url: reasonsRoute,
        params,
        method: 'GET',
    })
    if (error) {
        onFinishCallback()
        //yield showToast(message, { type: 'danger' })
        return
    }
    let reasonsData = data['administration/items'].map(({ id, name }: any) => ({ id, name }))

    yield put(setReasonsReducerAction(reasonsData))
    onFinishCallback()
}

export default function* fetchReasonsSagas() {
    yield takeLatest(FETCH_REASONS_SAGAS, fetchReasons)
}
