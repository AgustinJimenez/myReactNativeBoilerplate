import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/types'

let dataSetsInitialState = {
    token: null,
    login: {
        loading: false,
        error: false,
    },
}

let authReducer = (state = dataSetsInitialState, action) => {
    let { type, error, data } = action
    //console.log('AUTH-REDUCER ===> ', { action })
    switch (type) {
        case LOGIN:
            return { ...state, login: { loading: true, error: false } }

        case LOGIN_SUCCESS:
            return { ...state, login: { loading: false, error: false }, token: data.token }

        case LOGIN_ERROR:
            return { ...state, login: { loading: false, error }, token: null }

        default:
            return state
    }
}

export default authReducer
