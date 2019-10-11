import { SIMPLE_FETCH, LOGIN, LOGOUT } from '../actions/types'
import { takeLatest, /* takeEvery, */ all } from 'redux-saga/effects'
import simpleFetchSagas from '../sagas/simpleFetchSagas'
import { loginSagas, logoutSagas } from '../sagas/authSagas'

function* simpleFetch() {
    yield takeLatest(SIMPLE_FETCH, simpleFetchSagas)
}
function* login() {
    yield takeLatest(LOGIN, loginSagas)
}
function* logout() {
    yield takeLatest(LOGOUT, logoutSagas)
}

function* rootSaga() {
    yield all([simpleFetch(), login(), logout()])
}
export default rootSaga
