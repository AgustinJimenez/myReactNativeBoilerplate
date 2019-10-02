import React from 'react'
import { StyleProvider } from 'native-base'
import getTheme from '../theme/components'
import variables from '../theme/variables/commonColor'
import NavigationContainer from '../Router'

import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

import Splash from '../components/Splash'

let App = _ => (
    <ReduxProvider store={store}>
        <PersistGate loading={Splash} persistor={persistor}>
            <StyleProvider style={getTheme(variables)}>
                <NavigationContainer />
            </StyleProvider>
        </PersistGate>
    </ReduxProvider>
)

export default App
