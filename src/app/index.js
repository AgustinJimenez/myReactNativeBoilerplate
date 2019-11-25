import React from 'react'
import { StyleProvider } from 'native-base'
import getTheme from '../theme/components'
import variables from '../theme/variables/commonColor'
import NavigationProvider from './NavigationProvider'
import NavigationService from './NavigationService'

import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Root } from 'native-base'
import LoadingScreen from '../screens/LoadingScreen'
import NavigationMiddleware from './NavigationScreenMiddleware'
import './i18n'
import NetStatusChecker from './NetStatusChecker'

import TaskProvider from './TaskProvider'
import { YellowBox } from 'react-native'
import { disableYellowBox, ignoreWarnings } from '../../env'

let theme = getTheme(variables)
console.disableYellowBox = disableYellowBox
YellowBox.ignoreWarnings(ignoreWarnings)
const App = _ => (
    <ReduxProvider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
            <StyleProvider style={theme}>
                <Root>
                    <NavigationProvider
                        onNavigationStateChange={NavigationMiddleware}
                        ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
                    />
                    <NetStatusChecker />
                    <TaskProvider />
                </Root>
            </StyleProvider>
        </PersistGate>
    </ReduxProvider>

)

export default App
