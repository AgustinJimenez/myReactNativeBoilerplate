import { NavigationActions } from 'react-navigation'

let _navigator: any

const setTopLevelNavigator = (navigatorRef: any) => {
    _navigator = navigatorRef
}

const navigate = (routeName: string, params: any) => {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    )
}
const dispatch = (actions: any) => _navigator.dispatch(actions)
// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
    dispatch,
}
