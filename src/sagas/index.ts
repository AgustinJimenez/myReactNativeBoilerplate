import { all } from 'redux-saga/effects'
import changeLanguageSagas from './changeLanguageSagas'
import authSagas from './authSagas'
import updateNetworkStatusSagas from './updateNetworkStatusSagas'
import checkNetworkStatusSaga from './checkNetworkStatusSaga'
import logoutSaga from './logoutSaga'

export default function* rootSaga() {
    yield all([logoutSaga(), checkNetworkStatusSaga(), updateNetworkStatusSagas(), authSagas(), changeLanguageSagas()])
}
