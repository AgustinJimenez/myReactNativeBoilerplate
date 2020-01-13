import { call, select, put } from 'redux-saga/effects'
import { authSelector, networkSelector } from '../selectors/datasetsSelector'
import showToast from '../utils/showToast'
import NavigationService from '../app/NavigationProvider/service'
import HttpStatus from 'http-status-codes'
import axios from 'axios'
import i18n from '../app/i18n'
import { checkNetworkStatusAction, logoutAction } from '../actions'
import moment from 'moment'

var connErrMsg = 'Connection Error.'

export default function* request(options: any) {
    var startTime: any = {},
        endTime: any = {},
        network: any = {},
        auth,
        response: any = {},
        data = {},
        error = null,
        message,
        defaultOptions: any = {
            timeout: 10000,
            headers: { Authorization: null },
            method: 'GET',
            debug: false,
        }

    try {
        /* 
        network = yield select(networkSelector)
        if (!!network && !network.isConnected) {
            //message = yield call(i18n.t, 'ECONNABORTED')
            message = yield i18n.t('ECONNABORTED')
            error = true
            throw { error, message, data }
        } 
        */
        options = { ...defaultOptions, ...options }
        if (options.debug) startTime = moment(new Date())

        yield put(checkNetworkStatusAction())
        auth = yield select(authSelector)
        if (!!auth.token) defaultOptions.headers.Authorization = `Bearer ${auth.token}`
        if (options.debug)
            console.log(
                `\n<==========REQUEST[${options.url}][${options.method}]=========>\n`,
                { options, auth, startTime, endTime },
                '\n<====================================================================================>\n',
            )
        response = yield call(axios, options)
        //console.log('HERE ===> ', { response })
        if (!response || !Object.keys(response).length) throw { error: true, data, message: connErrMsg }
        if (!!response.data) {
            data = response.data.data
            error = response.data.error
            message = response.data.message
        }
    } catch (err) {
        if (options.debug) console.log('REQUEST ERROR!!!! ===> ', { err })
        if (!!err.response && !!err.response.data) {
            response = err.response
            data = response.data.data
            error = response.data.error
            message = response.data.message
        } else if (!!err.code) {
            switch (err.code) {
                case 'ECONNABORTED':
                    message = connErrMsg
                    break
                default:
                    message = err.message
                    break
            }
            error = true
        }
    } finally {
        if (options.debug) {
            endTime = moment(new Date())
            let diffTime = endTime.diff(startTime, 'seconds', true)
            startTime = startTime.format('HH:mm:ss')
            endTime = endTime.format('HH:mm:ss')
            console.log(
                `\n<==========RESPONSE[${options.url}][${options.method}]=========>\n`,
                { options, response, data, error, message, startTime, endTime, diffTime },
                '\n<====================================================================================>\n',
            )
        }

        switch (response.status) {
            case HttpStatus.NOT_FOUND:
                yield showToast(i18n.t('data_not_found'), { type: 'danger' })
                break
            case HttpStatus.UNAUTHORIZED:
                yield showToast(message, { type: 'danger' })
                yield put(logoutAction())
                break
        }
        //console.log('FINALLY =====> ', { response, data, error, message })
        return { response, data, error, message }
    }
}
