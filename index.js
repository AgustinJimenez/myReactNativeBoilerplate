import { AppRegistry } from 'react-native'
import Aplication from './src/boot'
import { name as appName } from './app.json'
AppRegistry.registerComponent(appName, _ => Aplication)
