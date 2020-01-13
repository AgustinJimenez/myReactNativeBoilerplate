import { put, call } from 'redux-saga/effects'
import { FETCH_CLIENTS_SAGAS } from '../actions/types'
import { setClientsReducerAction } from '../actions'
import { takeLatest } from 'redux-saga/effects'
//import showToast from '../utils/showToast'
import { clientsRoute } from '../api/routes'
import request from './request'

export function* fetchClients({ searchName = null, onFinishCallback = () => {}, clientsIds = [] }: any) {
    //console.log('fetchClients ===> ', { searchName, clientsIds })
    let params: any = {
        pager: 5000,
    }
    if (!!searchName) params.q_name = searchName
    if (clientsIds.length) params.i_id = clientsIds.join('|')

    var { data, error, message } = yield call(request, {
        url: clientsRoute,
        params,
        method: 'GET',
        //debug: true,
    })

    if (!!data['administration/peoples']) {
        let clientsData = data['administration/peoples'].map(({ id, name }: any) => ({ id, name }))
        yield put(setClientsReducerAction(clientsData))
    }
    onFinishCallback()
}

export default function* fetchClientsSaga() {
    yield takeLatest(FETCH_CLIENTS_SAGAS, fetchClients)
}
