import { AppRegistry } from 'react-native'
import Aplication from './src/app'
import { name as appName } from './app.json'
AppRegistry.registerComponent(appName, _ => Aplication)
