import React from 'react'
import { StyleProvider } from 'native-base'
import getTheme from '../theme/components'
import variables from '../theme/variables/commonColor'
import NavigationContainer from '../navigation'

import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Root } from 'native-base'
import LoadingScreen from '../screens/LoadingScreen'

let theme = getTheme(variables)

let App = _ => (
    <ReduxProvider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
            <StyleProvider style={theme}>
                <Root>
                    <NavigationContainer />
                </Root>
            </StyleProvider>
        </PersistGate>
    </ReduxProvider>
)

export default App
