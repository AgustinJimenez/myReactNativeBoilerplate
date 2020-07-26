import React from 'react'
import { StyleProvider } from 'native-base'
import { StatusBar } from 'react-native'
import getTheme from '../theme/components'
import variables from '../theme/variables/commonColor'
import NavigationProvider from './NavigationProvider'
import { navigationRef, isReadyRef } from './NavigationProvider/service'

import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Root } from 'native-base'
import LoadingScreen from '../screens/LoadingScreen'
//import NavigationMiddleware from './NavigationScreenMiddleware'
import './i18n'
import NetStatusChecker from './NetStatusChecker'
import { NavigationContainer } from '@react-navigation/native'
import TaskProvider from './TaskProvider'
import { YellowBox } from 'react-native'
import { disableYellowBox, ignoreWarnings } from '../../env.json'

let theme = getTheme(variables)
console.disableYellowBox = disableYellowBox
YellowBox.ignoreWarnings(ignoreWarnings)

const App = () => {
    React.useEffect(() => {
        return () => (isReadyRef.current = false)
    }, [])

    return (
        <ReduxProvider store={store}>
            <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                    isReadyRef.current = true
                }}
            >
                <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                    <StyleProvider style={theme}>
                        <Root>
                            <StatusBar barStyle='light-content' />
                            <NavigationProvider
                            //onNavigationStateChange={NavigationMiddleware}
                            />
                            <NetStatusChecker />
                            <TaskProvider />
                        </Root>
                    </StyleProvider>
                </PersistGate>
            </NavigationContainer>
        </ReduxProvider>
    )
}

export default App
