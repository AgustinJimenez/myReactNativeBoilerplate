import React from 'react'
import { Text, View } from 'native-base'
import { Agenda, LocaleConfig } from 'react-native-calendars'
import { withNavigation } from 'react-navigation'
//import JSONTree from 'react-native-json-tree'
import { fetchAppointments } from '../../../../actions'
import { appointmentsSelector } from '../../../../selectors/datasetsSelector'
import { connect } from 'react-redux'
import styles from './styles'

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' }
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' }
const workout = { key: 'workout', color: 'green' }
LocaleConfig.locales['es'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Miér', 'Juev', 'Vier', 'Sáb'],
    today: 'Hoy',
}
LocaleConfig.defaultLocale = 'es'

class AgendaWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.renderAppointment = this.renderAppointment.bind(this)
        this.renderEmptyDate = this.renderEmptyDate.bind(this)
        this.rowHasChanged = this.rowHasChanged.bind(this)
        props.fetchAppointments()
    }

    state = {
        appointments: {},
    }
    getAppointments = _ => this.props.appointmentsSelector.data || []
    render() {
        return (
            <Agenda
                items={this.getAppointments()}
                selected='2019-05-20'
                renderItem={this.renderAppointment}
                renderEmptyDate={this.renderEmptyDate}
                rowHasChanged={this.rowHasChanged}
            />
        )
    }
    renderAppointment = appointment => (
        <View style={[styles.item, { height: appointment.height }]}>
            <Text onPress={() => this.props.navigation.navigate('Appointment', appointment)}>{appointment.name}</Text>
        </View>
    )

    renderEmptyDate = _ => (
        <View style={styles.emptyDate}>
            <Text>This is empty date!</Text>
        </View>
    )

    rowHasChanged = (r1, r2) => r1.name !== r2.name
    timeToString = time => new Date(time).toISOString().split('T')[0]
}

const mapStateToProps = state => ({
    appointmentsSelector: appointmentsSelector(state),
})
const mapDispatchToProps = {
    fetchAppointments,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withNavigation(AgendaWrapper))
