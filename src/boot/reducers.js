import { FETCH, FETCH_SUCCESS, FETCH_ERROR } from '../actions/types'

const reducers = (state = {}, action) => {
    let { type, data, error } = action
    //console.warn('REDUCERS ===> ', { state, action, error })
    switch (type) {
        case FETCH:
            return { ...state, loading: true, error: false }
        case FETCH_SUCCESS:
            return { ...state, data, loading: false, error: false }
        case FETCH_ERROR:
            return { ...state, loading: false, error }
        default:
            return state
    }
}
export default reducers
