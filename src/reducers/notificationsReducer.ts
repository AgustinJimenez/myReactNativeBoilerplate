import { SET_NOTIFICTION_REDUCER, CLEAR_NOTIFICTIONS_REDUCER } from '../actions/types'
const initialState: any = {}
let reasonsReducer = (state = initialState, action: any) => {
    let { type, data } = action
    switch (type) {
        case SET_NOTIFICTION_REDUCER:
            state[data.userInfo.id_on_device] = data
            state = { ...state }
            break
        case CLEAR_NOTIFICTIONS_REDUCER:
            state = {}
            break
    }
    return state
}
export default reasonsReducer
