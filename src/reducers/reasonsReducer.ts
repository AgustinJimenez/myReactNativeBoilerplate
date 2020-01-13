import { FETCH_REASONS_REDUCER, CLEAR_REASONS_REDUCER } from '../actions/types'
const initialState: any = {}
let reasonsReducer = (state = initialState, action: any) => {
    let { type, data } = action
    switch (type) {
        case FETCH_REASONS_REDUCER:
            data.map(({ id, name }: any) => {
                state[id] = { id, name }
            })
            state = { ...state }
            break
        case CLEAR_REASONS_REDUCER:
            state = {}
            break
    }
    return state
}
export default reasonsReducer
