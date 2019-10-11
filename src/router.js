import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import SideBar from './components/SideBars'

//SCREENS
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import AgendaFormScreen from './screens/AgendaFormScreen'
import SettingsScreen from './screens/SettingsScreen'
import AppointmentScreen from './screens/AppointmentScreen'

let AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        AgendaForm: AgendaFormScreen,
        Settings: SettingsScreen,
        Appointment: AppointmentScreen,
    },
    {
        defaultNavigationOptions: {
            headerBackTitle: 'Atrás',
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
