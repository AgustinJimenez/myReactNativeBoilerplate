import React from 'react'
import DrawerIcon from '../../components/DrawerIcon'
import { withNavigation } from 'react-navigation'
import HeaderTitle from '../../components/HeaderTitle'

//import JSONTree from 'react-native-json-tree'
//import { connect } from 'react-redux'
import { NotificationsList } from './components'

class NotificationsScreen extends React.Component {
    state = {
    }

    static navigationOptions = {
        headerTitle: <HeaderTitle trans_id='appointment_notifications' />,
        headerLeft: <DrawerIcon />,
    }

    render() {
        return <NotificationsList />
    }

}

NotificationsScreen = withNavigation(NotificationsScreen)
export default NotificationsScreen
