import React from 'react'
import { Text, View, Icon, Right, Body } from 'native-base'
import { TouchableOpacity, Alert, Platform } from 'react-native'
import { Agenda, LocaleConfig, calendarTheme } from 'react-native-calendars'
import { withNavigation } from 'react-navigation'
//import JSONTree from 'react-native-json-tree'
import { fetchAppointments, deleteItemFromDatasetList } from '../../../../actions'
import { appointmentsSelector } from '../../../../selectors/datasetsSelector'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
//import app_styles, { colors } from '../../../theme/variables/commonStyles'
import styles from './styles'
import { SwipeRow } from 'react-native-swipe-list-view'
import { getAppointmentTitleLimited, getAppointments, getTimeFromDatetime, parseAppointmentsForAgenda } from './methods'

const setCalendarLanguage = (lang = 'es') => {
    LocaleConfig.locales['es'] = {
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Miér', 'Juev', 'Vier', 'Sáb'],
        today: 'Hoy',
    }
    LocaleConfig.defaultLocale = lang
}

class AgendaWrapper extends React.Component {
    constructor(props) {
        super(props)
        if (props.i18n.language === 'es') setCalendarLanguage(props.i18n.language)
        this.setNavigationListeners()
    }

    setNavigationListeners = _ => {
        this.props.navigation.addListener('willFocus', payload => {
            this.props.fetchAppointments()
        })
    }
    agendaRef
    state = {}

    deleteButtonWasTapped = appointment => {
        Alert.alert(this.props.t('warning'), this.props.t('sure_want_delete_record'), [
            {
                text: this.props.t('no'),
            },
            {
                text: this.props.t('yes'),
                onPress: async _ => {
                    this.props.deleteItemFromDatasetList(appointment, 'appointments')
                },
            },
        ])
    }

    renderEmptyData = _ => (
        <View style={styles.emptyDate}>
            <Text style={styles.itemTextGray}>{this.props.t('empty_data')}</Text>
        </View>
    )

    calendarOffset() {
        const offset = Platform.OS === 'ios' ? 90 : 100
        return offset - this.viewHeight / 2
    }

    render() {
        let appointments = getAppointments(this.props)
        let parsedAppointments = parseAppointmentsForAgenda(appointments)
        let hasData = !!Object.keys(parsedAppointments)[0]
        //console.log('HERE ===> ', { noData: !hasData, appointments, parsedAppointments })

        if (!hasData)
            return (
                <View style={styles.noData}>
                    <Text>{this.props.t('no_data')}</Text>
                    {/* <JSONTree data={{ state: this.state, props: this.props }} /> */}
                </View>
            )
        return (
            <Agenda
                //refreshing
                selected={Platform.OS === 'android' ? Object.keys(parsedAppointments)[0] : undefined}
                items={parsedAppointments}
                rowHasChanged={(appointmnet1, appointment2) => {
                    let hasChanged = JSON.stringify(appointmnet1.getDatas()) !== JSON.stringify(appointment2.getDatas())
                    //if (hasChanged)
                    //console.log('rowHasChanged ===> ', { hasChanged, appointmnet1: appointmnet1.getDatas(), appointment2: appointment2.getDatas() })
                    return hasChanged
                }}
                renderKnob={() => {
                    return <Icon success name='drag-horizontal' fontSize={18} type='MaterialCommunityIcons' style={{ color: '#777777' }} />
                }}
                theme={{
                    ...calendarTheme,
                    agendaDayTextColor: 'rgba(202, 41, 42, 1)',
                    agendaDayNumColor: 'rgba(202, 41, 42, 1)',
                    todayTextColor: 'rgba(202, 41, 42, 1)',
                    agendaKnobColor: '#777777',
                    dotColor: 'rgba(202, 41, 42, 1)',
                    selectedDotColor: '#ffffff',
                    selectedDayBackgroundColor: 'rgba(202, 41, 42, 1)',
                    textSectionTitleColor: 'rgba(202, 41, 42, 1)',
                    textMonthFontWeight: 'bold',
                }}
                renderEmptyData={this.renderEmptyData}
                renderItem={appointment => {
                    return (
                        <SwipeRow closeOnRowPress disableRightSwipe disableLeftSwipe={appointment.isFinished()} stopRightSwipe={-180} rightOpenValue={-180}>
                            <View style={styles.buttonsContainer}>
                                {!appointment.isCheckedIn() && (
                                    <TouchableOpacity onPress={_ => this.deleteButtonWasTapped(appointment)} style={[styles.button, styles.bgDanger]}>
                                        <Icon active name='trash' style={styles.buttonIcon} />
                                    </TouchableOpacity>
                                )}

                                {!appointment.isCheckedIn() && (
                                    <TouchableOpacity
                                        style={[styles.button, styles.bgPrimary]}
                                        onPress={_ => {
                                            this.props.navigation.push('AppointmentForm', { appointment, formType: 'edit' })
                                        }}
                                    >
                                        <Icon active name='pencil' style={styles.buttonIcon} type='MaterialCommunityIcons' />
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity
                                    style={[styles.button, styles.bgWarning]}
                                    onPress={_ => {
                                        this.props.navigation.push('AppointmentCheckIn', { appointment })
                                    }}
                                >
                                    <Icon active name='file-signature' style={styles.buttonIcon} type='FontAwesome5' />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.item}>
                                <Body style={styles.itemTextContainer}>
                                    <Text style={styles.itemText}>{getAppointmentTitleLimited(appointment.name)}</Text>
                                </Body>

                                <Right style={styles.itemIconContainer}>
                                    {!appointment.isFinished() ? (
                                        <Text style={styles.itemTextGray}>{getTimeFromDatetime(appointment.datetime)}</Text>
                                    ) : (
                                        <Icon success name='check-circle-o' type='FontAwesome' style={styles.successColor} />
                                    )}
                                </Right>
                            </View>
                        </SwipeRow>
                    )
                }}
            />
        )
    }
}

const mapStateToProps = state => ({
    appointments: appointmentsSelector(state),
})
const mapDispatchToProps = {
    fetchAppointments,
    deleteItemFromDatasetList,
}
AgendaWrapper = withTranslation()(AgendaWrapper)
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AgendaWrapper))
