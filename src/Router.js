import Page1 from './screens/Page1/Page1';
import Page2 from './screens/Page2/Page2';

import SideMenu from './components/SideMenu/SideMenu';
import { createDrawerNavigator } from 'react-navigation';

export default createDrawerNavigator
({
  Page1: { screen: Page1 },
  Page2: { screen: Page2 }
}, 
{
  drawerWidth: 300, 
  contentComponent: SideMenu
});