import { SIMPLE_FETCH, LOGIN } from '../actions/types'
import { takeLatest, /* takeEvery ,*/ all } from 'redux-saga/effects'
import simpleFetchSagas from '../sagas/simpleFetchSagas'
import authSagas from '../sagas/authSagas'

function* simpleFetch() {
    yield takeLatest(SIMPLE_FETCH, simpleFetchSagas)
}
function* login() {
    yield takeLatest(LOGIN, authSagas)
}
function* rootSaga() {
    yield all([simpleFetch(), login()])
}
export default rootSaga
