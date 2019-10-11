import React from 'react'
import { Container, Text, View } from 'native-base'
import { Agenda, LocaleConfig } from 'react-native-calendars'
import { withNavigation } from 'react-navigation'
import styles from './styles'

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' }
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' }
const workout = { key: 'workout', color: 'green' }
LocaleConfig.locales['es'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sept.', 'Oct.', 'Nov.', 'Dic.'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Miér.', 'Juev.', 'Vier.', 'Sáb.'],
    today: 'Hoy',
}
LocaleConfig.defaultLocale = 'es'

class AgendaWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.loadAppointment = this.loadAppointment.bind(this)
        this.renderAppointment = this.renderAppointment.bind(this)
        this.renderEmptyDate = this.renderEmptyDate.bind(this)
        this.rowHasChanged = this.rowHasChanged.bind(this)
    }

    state = {
        appointments: {},
    }

    render() {
        return (
            <Agenda
                onDayPress={date => {
                    console.log('onDayPress ==> ', { date })
                }}
                items={this.state.appointments}
                loadItemsForMonth={this.loadAppointment}
                selected={'2019-06-02'}
                renderItem={this.renderAppointment}
                renderEmptyDate={this.renderEmptyDate}
                rowHasChanged={this.rowHasChanged}
                /* renderItem={(item, firstItemInDay) => {
                            console.log('render-item ===> ', { item, firstItemInDay })
                            return <View />
                        }} */
                // markingType={'period'}
                /*markedDates={{
                        //'2017-05-08': {textColor: '#666'},
                        //'2017-05-09': {textColor: '#666'},
                        //'2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                        "2017-05-21": {
                            dots: [vacation, massage, workout],
                            selected: true
                        }
                        //'2017-05-22': {endingDay: true, color: 'gray'},
                        //'2017-05-24': {startingDay: true, color: 'gray'},
                        //'2017-05-25': {color: 'gray'},
                        //'2017-05-26': {endingDay: true, color: 'gray'}
                        }}*/
                // monthFormat={'yyyy'}
                //markingType={"multi-dot"}
                // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            />
        )
    }
    loadAppointment = day => {
        setTimeout(() => {
            let time, strTime
            for (let i = -15; i < 85; i++) {
                time = day.timestamp + i * 24 * 60 * 60 * 1000
                strTime = this.timeToString(time)
                if (!this.state.appointments[strTime]) {
                    this.state.appointments[strTime] = []
                    const numItems = Math.floor(Math.random() * 5)
                    for (let j = 0; j < numItems; j++) {
                        this.state.appointments[strTime].push({
                            name: `Cita para ${strTime} en Mariano`,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                            dots: [vacation, massage, workout],
                        })
                    }
                }
            }
            //console.log(this.state.items);
            var newAppointments = {}
            Object.keys(this.state.appointments).forEach(key => {
                newAppointments[key] = this.state.appointments[key]
            })
            this.setState({
                appointments: newAppointments,
            })
        }, 1000)
        //console.log(`Load Items for ${day.year}-${day.month}`);
    }
    renderAppointment = appointment => {
        return (
            <View style={[styles.item, { height: appointment.height }]}>
                <Text onPress={() => this.props.navigation.navigate('Appointment', appointment)}>{appointment.name}</Text>
            </View>
        )
    }

    renderEmptyDate = _ => (
        <View style={styles.emptyDate}>
            <Text>This is empty date!</Text>
        </View>
    )

    rowHasChanged = (r1, r2) => r1.name !== r2.name

    timeToString = time => {
        const date = new Date(time)
        return date.toISOString().split('T')[0]
    }
}
export default withNavigation(AgendaWrapper)
