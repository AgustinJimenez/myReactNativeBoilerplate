import React from 'react'
import { Container, Icon, Fab } from 'native-base'
import styles from './styles'
import Agenda from './components/Agenda'
import NotificationProvider from '../../app/NotificationProvider'
//import { othersSelector } from '../../selectors/datasetsSelector'
//import JSONTree from 'react-native-json-tree'
//import { connect } from 'react-redux'
import PermissionsChecker from '../../app/PermissionsChecker'
import { connect } from 'react-redux'
import AppHeader from '../../components/AppHeader'

class HomeScreen extends React.Component {
    state = {
        userHasTappedFormButtonRecently: false,
    }
    agendaRef = null

    componentDidMount() {
        this.props.navigation.addListener('willFocus', (payload: any) => {})
    }
    goToForm = () => {
        if (!this.state.userHasTappedFormButtonRecently) {
            this.props.navigation.navigate('AppointmentForm', {})
            this.setState({
                userHasTappedFormButtonRecently: true,
            })
        } else
            setTimeout(() => {
                //preventing double tap
                this.setState({
                    userHasTappedFormButtonRecently: false,
                })
            }, 1500)
    }
    render() {
        //console.log('RENDER Homescreen ==>', this.state)
        return (
            <Container>
                <AppHeader trans_id='appointment_schedule' />
                <Agenda navigation={this.props.navigation} />
                <Fab active={true} style={styles.fab} position='bottomRight' onPress={this.goToForm}>
                    <Icon name='add' />
                </Fab>
                {/* <JSONTree data={this.state} /> */}
                <PermissionsChecker />
                <NotificationProvider />
            </Container>
        )
    }
}

const mapStateToProps = (state: any) => ({
    //others: othersSelector(state),
})
const mapDispatchToProps = {
    //setOthers,
    //syncAppointmentsAction,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeScreen)
