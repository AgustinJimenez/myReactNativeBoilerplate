import { put, call } from 'redux-saga/effects'
import { SIMPLE_FETCH_ERROR, SIMPLE_FETCH_SUCCESS } from '../actions/types'
import axios from 'axios'

function* simpleFetchSagas(params) {
    let { options, dataset_name } = params
    //console.log('SIMPLE-FETCH-SAGAS ===> ', { params })
    try {
        let { data, status, statusText } = yield call(axios, { ...options })
        //console.log('SAGAS-FETCH', { data })
        yield put({ type: SIMPLE_FETCH_SUCCESS, data, dataset_name })
    } catch (error) {
        //console.log('SAGAS-ERROR', { error })
        yield put({ type: SIMPLE_FETCH_ERROR, error })
    }
}
export default simpleFetchSagas
