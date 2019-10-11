import React from 'react'
import { StyleProvider } from 'native-base'
import getTheme from '../theme/components'
import variables from '../theme/variables/commonColor'
import NavigationProvider from '../router'
import NavigationService from './navigationService'

import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Root } from 'native-base'
import LoadingScreen from '../screens/LoadingScreen'
import NavigationMiddleware from './navigationScreenMiddleware'

let theme = getTheme(variables)

let App = _ => {
    console.disableYellowBox = true

    return (
        <ReduxProvider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                <StyleProvider style={theme}>
                    <Root>
                        <NavigationProvider
                            onNavigationStateChange={NavigationMiddleware}
                            ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
                        />
                    </Root>
                </StyleProvider>
            </PersistGate>
        </ReduxProvider>
    )
}

export default App
