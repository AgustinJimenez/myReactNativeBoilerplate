import { SIMPLE_FETCH } from '../actions/types'
import { takeLatest, /* takeEvery ,*/ all } from 'redux-saga/effects'
import simpleFetch from '../sagas/simpleFetch'

function* actionWatcher() {
    yield takeLatest(SIMPLE_FETCH, simpleFetch)
}
function* rootSaga() {
    yield all([actionWatcher()])
}
export default rootSaga
