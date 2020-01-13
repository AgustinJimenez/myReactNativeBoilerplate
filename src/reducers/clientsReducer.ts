import { FETCH_CLIENTS_REDUCER, CLEAR_CLIENTS_REDUCER } from '../actions/types'
const initialState: any = {}
let clientsReducer = (state = initialState, action: any) => {
    let { type, data } = action
    switch (type) {
        case FETCH_CLIENTS_REDUCER:
            data.map(({ id, name }: any) => {
                state[id] = { id, name }
            })
            state = { ...state }
            break
        case CLEAR_CLIENTS_REDUCER:
            state = {}
            break
    }
    return state
}
export default clientsReducer
