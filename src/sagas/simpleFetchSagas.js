import { put, call, select } from 'redux-saga/effects'
import { SIMPLE_FETCH_ERROR, SIMPLE_FETCH_SUCCESS } from '../actions/types'
import axios from 'axios'
import showToast from '../utils/showToast'
import { authSelector } from '../selectors/datasetsSelector'

const defaultOptions = {
    timeout: 10000,
    headers: { 'Authorization': null }
}

function* simpleFetchSagas(params) {
    let { options, dataset_name, showResponseMessage = false, onSuccess, parseData, useDataset = true } = params
    let response
    let auth = yield select(authSelector)
    var data
    if (!!auth.data.token)
        defaultOptions.headers.Authorization = `bearer ${auth.data.token}`

    //console.table('SIMPLE-FETCH-SAGAS ===> ', { params, token })
    try {
        response = yield call(axios, { ...defaultOptions, ...options })
        data = response.data
        status = response.status
        statusText = response.statusText
        if (!!response.data.message && showResponseMessage) showToast(response.data.message, { type: 'success' })
        //console.log('SAGAS-FETCH', { response })
        if (!!onSuccess) onSuccess()
        if (!!parseData) data = parseData(data)

        if (useDataset)
            yield put({ type: SIMPLE_FETCH_SUCCESS, dataset_name, data })

    } catch (error) {
        //console.log('SAGAS-ERROR', { error })
        if (showResponseMessage) {
            let message
            if (!!error.code) {
                message = error.code

            } else if (!!error.response && !!error.response.data)
                message = error.response.data.message
            else if (!!error.message)
                message = error.message
            showToast(message, { type: 'danger' })
        }
        if (useDataset)
            yield put({ type: SIMPLE_FETCH_ERROR, dataset_name, error })

    } finally {
        return data
    }
}
export default simpleFetchSagas
