import React from "react"
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
//COMPONENTS
import SideBar from './components/SideBars/SideBar'

//SCREENS
import SimpleList from "./screens/1SimpleList/SimpleList"
import HomeScreen from "./screens/HomeScreen/HomeScreen"
import ListDetails from "./screens/2ListDetails/ListDetails"
import Detail from "./screens/2ListDetails/Detail"


const sidebar_routes =
  [
    { title: "Home", route: "Home", icon: "home" },
    { title: "1 - Simmple List", route: "SimpleList" },
    { title: "2 - List Details", route: "ListDetails" },
  ]

const Drawer = createDrawerNavigator
  (
    {
      Home: { screen: HomeScreen },
      SimpleList: { screen: SimpleList },
      ListDetails: { screen: ListDetails }
    },
    {
      contentComponent: props => <SideBar sidebar_routes={sidebar_routes} {...props} />
    }
  )

const StackNavigator = createStackNavigator
  ({
    Drawer: { screen: Drawer },
    TwoDetailListDetails: { screen: ListDetails },
    Detail: { screen: Detail }
  },
    {
      initialRouteName: "Drawer",
      headerMode: "none"
    })

let NavigationContainer = createAppContainer(StackNavigator)

export default NavigationContainer