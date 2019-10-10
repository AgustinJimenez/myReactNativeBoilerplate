import { put, call } from 'redux-saga/effects'
import { LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/types'
import axios from 'axios'
import showToast from '../utils/showToast'

function* login(params) {
    let { options } = params
    let data, response
    try {
        response = yield call(axios, { ...options })
        data = response.data
        if (!!response.data.message) showToast(response.data.message, { type: 'success' })
        //console.log('LOGIN-SAGAS-RESPONSE ===> ', { response })
        yield put({ type: LOGIN_SUCCESS, data })
    } catch (error) {
        let message = 'ERROR'
        if (!!error.response && !!error.response.data) message = error.response.data.message
        else if (!!error.message) message = error.message

        //console.log('LOGIN-SAGAS-ERROR ===> ', { error, message })
        showToast(message, { type: 'danger' })
        yield put({ type: LOGIN_ERROR, error: TRUE })
    }
}
export default login
