import React from 'react'
import { StyleProvider } from 'native-base'
import getTheme from '../theme/components'
import variables from '../theme/variables/commonColor'
import NavigationContainer from '../Router'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store'

export default () => (
    <ReduxProvider store={store}>
        <StyleProvider style={getTheme(variables)}>
            <NavigationContainer />
        </StyleProvider>
    </ReduxProvider>
)
