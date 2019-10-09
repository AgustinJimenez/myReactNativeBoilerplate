const authSelector = state => state.auth
export const authTokenSelector = state => authSelector(state).token
