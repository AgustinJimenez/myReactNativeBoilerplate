import { FETCH } from '../actions/types'
import { takeLatest, all } from 'redux-saga/effects'
import fetch from '../sagas/fetch'

function* actionWatcher() {
    yield takeLatest(FETCH, fetch)
}
function* rootSaga() {
    yield all([actionWatcher()])
}
export default rootSaga
