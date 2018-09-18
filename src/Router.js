import React from "react";
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

//COMPONENTS
import SideMenu from './components/SideMenu/SideMenu';

//SCREENS
import SimpleList from "./screens/1SimpleList/SimpleList";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ListDetails from "./screens/2ListDetails/ListDetails";
import Detail from "./screens/2ListDetails/Detail";
import Page1 from './screens/Page1/Page1';
import Page2 from './screens/Page2/Page2';

const Drawer = createDrawerNavigator
(
  {
    Home: { screen: HomeScreen },
    Page1: { screen: Page1 },
    Page2: { screen: Page2 }
  },
  {
    contentComponent: props => <SideMenu {...props} />
  }
);

const AppNavigator = createStackNavigator(
{
  Drawer: { screen: Drawer },

  TwoDetails: { screen: Detail },
},
{
  initialRouteName: "Drawer",
  headerMode: "none"
});
export default AppNavigator;