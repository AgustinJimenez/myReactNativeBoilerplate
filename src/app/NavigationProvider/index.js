import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import SideBar from '../../components/SideBar'
import RightIcon from '../../components/RightIcon'
import GoBack from '../../components/GoBack'

//SCREENS
import AuthLoadingScreen from '../../screens/AuthLoadingScreen'
import HomeScreen from '../../screens/HomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import AppointmentFormScreen from '../../screens/AppointmentFormScreen'
import SettingsScreen from '../../screens/SettingsScreen'
import AppointmentScreen from '../../screens/AppointmentScreen'
import AppointmentStepsScreen from '../../screens/AppointmentStepsScreen'
import BlankTransitionScreen from '../../screens/BlankTransitionScreen'
import NotificationsScreen from '../../screens/NotificationsScreen'
import { headerStyle, headerBackTitleStyle } from './styles'

let AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        AppointmentForm: AppointmentFormScreen,
        Settings: SettingsScreen,
        Appointment: AppointmentScreen,
        AppointmentSteps: AppointmentStepsScreen,
        BlankTransition: BlankTransitionScreen,
        Notifications: NotificationsScreen,
    },
    {
        defaultNavigationOptions: {
            headerBackImage: <GoBack />,
            headerBackTitle: '  ', //'Atrás',
            headerBackTitleStyle,
            headerRight: <RightIcon />,
            headerStyle,
        },
    },
)
let DrawerStack = createDrawerNavigator(
    {
        App: AppStack,
    },
    {
        contentComponent: SideBar,
        initialRouteName: 'App',
        drawerLockMode: 'unlocked',
    },
)
let NavigationStacks = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Login: LoginScreen,
        App: DrawerStack,
    },
    {
        initialRouteName: 'AuthLoading',
        headerMode: 'none',
    },
)

let NavigationContainer = createAppContainer(NavigationStacks)

export default NavigationContainer
