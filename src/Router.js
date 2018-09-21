import React from "react";
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

//COMPONENTS
import SideBar from './components/SideBars/SideBar';

//SCREENS
import SimpleList from "./screens/1SimpleList/SimpleList";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ListDetails from "./screens/2ListDetails/ListDetails";
import Detail from "./screens/2ListDetails/Detail";
import Page1 from './screens/Page1/Page1';
import Page2 from './screens/Page2/Page2';
import SideDrawer from "./components/SideBars/SideBar";

const Drawer = createDrawerNavigator
(
  {
    Home: { screen: HomeScreen },
    SimpleList: { screen: SimpleList },
    ListDetails: { screen: ListDetails }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator
({
  Drawer: { screen: Drawer },
  TwoDetailListDetails: { screen: ListDetails },
  Detail: { screen: Detail }
},
{
  initialRouteName: "Drawer",
  headerMode: "none"
});
export default AppNavigator;