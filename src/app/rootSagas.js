import { SIMPLE_FETCH } from '../actions/types'
import { /* takeLatest,  */takeEvery, all } from 'redux-saga/effects'
import simpleFetchSagas from '../sagas/simpleFetchSagas'

function* simpleFetch() {
    yield takeEvery(SIMPLE_FETCH, simpleFetchSagas)
}

function* rootSaga() {
    yield all([simpleFetch()])
}
export default rootSaga
