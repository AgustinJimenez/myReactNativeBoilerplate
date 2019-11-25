import React from 'react'
import DrawerIcon from '../../components/DrawerIcon'
import { Container, Icon, Fab } from 'native-base'
import styles from './styles'
import { withNavigation } from 'react-navigation'
import Agenda from './components/Agenda'
import HeaderTitle from '../../components/HeaderTitle'
import { setOthers } from '../../actions'
import { othersSelector } from '../../selectors/datasetsSelector'
//import JSONTree from 'react-native-json-tree'
//import { connect } from 'react-redux'
import PermissionsChecker from '../../app/PermissionsChecker'

class HomeScreen extends React.Component {
    state = {
    }
    agendaRef = null
    static navigationOptions = {
        headerTitle: <HeaderTitle trans_id='appointment_schedule' />,
        headerLeft: <DrawerIcon />,
    }

    render() {
        //console.log('RENDER Homescreen ==>', this.state)
        return (
            <Container>
                <Agenda />
                <Fab
                    active={true}
                    style={styles.fab}
                    position='bottomRight'
                    onPress={_ => this.props.navigation.push('AppointmentForm')}
                >
                    <Icon name='add' />
                </Fab>
                {/* <JSONTree data={this.state} /> */}
                <PermissionsChecker />
            </Container>
        )
    }

}

const mapStateToProps = state => ({
    others: othersSelector(state),
})
const mapDispatchToProps = {
    setOthers,
}

export default withNavigation(HomeScreen)
/*
connect(
    mapStateToProps,
    mapDispatchToProps,
)(withNavigation(HomeScreen))
*/
