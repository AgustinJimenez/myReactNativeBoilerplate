import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
//COMPONENTS
import SideBar from './components/SideBars/SideBar'

//SCREENS
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SimpleList from './screens/1SimpleList/SimpleList'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import ListDetails from './screens/2ListDetails/ListDetails'
import Detail from './screens/2ListDetails/Detail'
import LoginScreen from './screens/LoginScreen'

let sidebar_routes = [
    { title: 'Home', route: 'Home', icon: 'home' },
    { title: '1 - Simmple List', route: 'SimpleList' },
    { title: '2 - List Details', route: 'ListDetails' },
]

let Drawer = createDrawerNavigator(
    {
        Login: { screen: LoginScreen },
        Home: { screen: HomeScreen },
        SimpleList: { screen: SimpleList },
        ListDetails: { screen: ListDetails },
    },
    {
        contentComponent: props => <SideBar sidebar_routes={sidebar_routes} {...props} />,
    },
)
let AuthStack = createStackNavigator({ Login: LoginScreen })
let AppStack = createStackNavigator(
    {
        Drawer: { screen: Drawer },
        TwoDetailListDetails: { screen: ListDetails },
        Detail: { screen: Detail },
    },
    {
        initialRouteName: 'Drawer',
        headerMode: 'none',
    },
)

let NavigationStacks = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    },
)

let NavigationContainer = createAppContainer(NavigationStacks)

export default NavigationContainer
