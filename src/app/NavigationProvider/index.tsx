import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import SideBar from '../../components/SideBar'

//SCREENS
import HomeScreen from '../../screens/HomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import SettingsScreen from '../../screens/SettingsScreen'
import { authSelector } from '../../selectors/datasetsSelector.js'
import { useSelector } from 'react-redux'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
const NavigationProvider = (props: any) => {
    let auth = useSelector(authSelector)

    if (!auth['token'])
        return (
            <Stack.Navigator initialRouteName='Login' headerMode='none'>
                <Stack.Screen name='Login' component={LoginScreen} />
            </Stack.Navigator>
        )

    return (
        <Drawer.Navigator openByDefault={false} initialRouteName='Home' drawerContent={(props: any) => <SideBar {...props} />}>
            <Drawer.Screen name='Home' component={HomeScreen} />
            <Drawer.Screen name='Settings' component={SettingsScreen} />
        </Drawer.Navigator>
    )
}

export default NavigationProvider
