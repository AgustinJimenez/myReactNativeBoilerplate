import React from 'react'
import DrawerIcon from '../../components/DrawerIcon'
import { Container, Icon, Fab } from 'native-base'
import styles from './styles'
import { withNavigation } from 'react-navigation'
import Agenda from './components/Agenda'
import HeaderTitle from '../../components/HeaderTitle'
import { syncAppointmentsAction } from '../../actions'
//import { othersSelector } from '../../selectors/datasetsSelector'
//import JSONTree from 'react-native-json-tree'
//import { connect } from 'react-redux'
import PermissionsChecker from '../../app/PermissionsChecker'
import { connect } from 'react-redux'
class HomeScreen extends React.Component {
    state = {
        userHasTappedFormButtonRecently: false,
    }
    agendaRef = null
    static navigationOptions = {
        headerTitle: <HeaderTitle trans_id='appointment_schedule' />,
        headerLeft: <DrawerIcon />,
    }
    componentDidMount() {
        this.props.navigation.addListener('willFocus', payload => {
            //this.props.syncAppointmentsAction()
        })
    }
    goToForm = () => {
        if (!this.state.userHasTappedFormButtonRecently) {
            this.props.navigation.push('AppointmentForm')
            this.setState({
                userHasTappedFormButtonRecently: true,
            })
        } else
            setTimeout(() => {
                this.setState({
                    userHasTappedFormButtonRecently: false,
                })
            }, 1500)
    }
    render() {
        //console.log('RENDER Homescreen ==>', this.state)
        return (
            <Container>
                <Agenda />
                <Fab active={true} style={styles.fab} position='bottomRight' onPress={this.goToForm}>
                    <Icon name='add' />
                </Fab>
                {/* <JSONTree data={this.state} /> */}
                <PermissionsChecker />
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    //others: othersSelector(state),
})
const mapDispatchToProps = {
    //setOthers,
    syncAppointmentsAction,
}

HomeScreen = withNavigation(HomeScreen)
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
