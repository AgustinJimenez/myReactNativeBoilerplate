import { put, call } from 'redux-saga/effects'
import { FETCH_SUCCESS, FETCH_ERROR } from '../actions/types'
import axios from 'axios'

function* fetch({ options }) {
    try {
        let { data, status, statusText } = yield call(axios, { ...options })
        //console.log('SAGAS-FETCH', { data })
        yield put({ type: FETCH_SUCCESS, data })
    } catch (error) {
        //console.log('SAGAS-ERROR', { error })
        yield put({ type: FETCH_ERROR, error })
    }
}
export default fetch
