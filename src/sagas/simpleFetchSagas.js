import { put, call } from 'redux-saga/effects'
import { SIMPLE_FETCH_ERROR, SIMPLE_FETCH_SUCCESS } from '../actions/types'
import axios from 'axios'
import showToast from '../utils/showToast'

function* simpleFetchSagas(params) {
    let { options, dataset_name, showResponseMessage = false, onSuccess, parseData } = params
    let response
    //console.table('SIMPLE-FETCH-SAGAS ===> ', { params })
    try {
        response = yield call(axios, { ...options })
        data = response.data
        status = response.status
        statusText = response.statusText
        if (!!response.data.message && showResponseMessage) showToast(response.data.message, { type: 'success' })
        //console.log('SAGAS-FETCH', { data })
        if (!!onSuccess) onSuccess()
        if (!!parseData) data = parseData(data)

        yield put({ type: SIMPLE_FETCH_SUCCESS, data, dataset_name })
    } catch (error) {
        //console.log('SAGAS-ERROR', { error })
        if (showResponseMessage) {
            let message = 'ERROR'
            if (!!error.response && !!error.response.data) message = error.response.data.message
            else if (!!error.message) message = error.message
            showToast(message, { type: 'danger' })
        }

        yield put({ type: SIMPLE_FETCH_ERROR, error })
    }
}
export default simpleFetchSagas
