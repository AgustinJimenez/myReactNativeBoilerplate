import React from 'react'
import { Text, View, Icon, Right, Body, Spinner } from 'native-base'
import { TouchableOpacity, Alert, Platform } from 'react-native'
import { Agenda, LocaleConfig, calendarTheme } from 'react-native-calendars'
import { withNavigation } from 'react-navigation'
//import JSONTree from 'react-native-json-tree'
import { fetchAppointmentsAction, deleteItemFromDatasetList, fetchClientsAction, syncAppointmentAction, fetchReasonsAction } from '../../../../actions'
import { appointmentsWithClientSelector } from '../../../../selectors/datasetsSelector'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
//import app_styles, { colors } from '../../../theme/variables/commonStyles'
import styles, { primaryColor } from './styles'
import NoDataLabel from '../../../../components/NoDataLabel'
import limitStr from '../../../../utils/limitStr'
import { getAppointments, parseAppointmentsForAgenda } from './methods'
import RotatingIcon from '../../../../components/utils/RotatingIcon'
import { STEPS } from '../../../../constants'
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
        //this.setNavigationListeners()
    }
    timer
    agendaRef
    state = {
        isLoadingDatas: false,
        isRefreshingCalendar: false,
        userHasTappedAppointmentRecently: false,
    }
    /* 
    setNavigationListeners = () => {
        this.props.navigation.addListener('willFocus', payload => {  })
    }
    */
    componentDidMount = () => {
        this.loadDatas()
    }
    getLocalClientsIds = () => {
        let localExistingClientsIds = {}
        this.props.appointments.map(({ client_id }) => {
            localExistingClientsIds[client_id] = null
        })
        return Object.keys(localExistingClientsIds) || []
    }
    getLocalReasonsIds = () => {
        let localExistingReasonsIds = {}
        this.props.appointments.map(({ reasons }) => {
            reasons.map(reason_id => {
                localExistingReasonsIds[reason_id] = null
            })
        })
        return Object.keys(localExistingReasonsIds) || []
    }
    loadDatas = async () => {
        await this.setState({ isLoadingDatas: true, isRefreshingCalendar: true })
        let onFinishCallback = () =>
            this.props.fetchAppointmentsAction(() => {
                this.props.fetchReasonsAction({
                    ids: this.getLocalReasonsIds(),
                })
                this.setState({ isLoadingDatas: false })
            })
        this.props.fetchClientsAction({ onFinishCallback, clientsIds: this.getLocalClientsIds() })

        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.setState({ isRefreshingCalendar: false })
        }, 600)
    }
    deleteButtonWasTapped = appointment => {
        Alert.alert(this.props.t('warning'), this.props.t('sure_want_delete_record'), [
            {
                text: this.props.t('no'),
            },
            {
                text: this.props.t('yes'),
                onPress: async () => {
                    this.props.deleteItemFromDatasetList(appointment, 'appointments')
                },
            },
        ])
    }

    renderEmptyData = () => {
        return (
            <View style={styles.emptyDate}>
                <Text style={styles.itemTextGray}>{this.props.t('empty_data')}</Text>
            </View>
        )
    }
    renderNoData = () => {
        if (this.state.isLoadingDatas && !this.props.appointments.length) return <Spinner color={primaryColor} />

        return <NoDataLabel />
    }

    calendarOffset() {
        const offset = Platform.OS === 'ios' ? 90 : 100
        return offset - this.viewHeight / 2
    }

    goToCheckInScreen = async appointment => {
        await this.setState({ userHasTappedAppointmentRecently: true })
        this.props.navigation.push('AppointmentSteps', { appointment })
        setTimeout(() => {
            this.setState({ userHasTappedAppointmentRecently: false })
        }, 2000)
    }

    render() {
        let appointments = getAppointments(this.props)
        let parsedAppointments = parseAppointmentsForAgenda(appointments)
        let firstDateOfData = Object.keys(parsedAppointments)[0]
        if (!firstDateOfData) return this.renderNoData()
        return (
            <React.Fragment>
                <Agenda
                    onRefresh={this.loadDatas}
                    //displayLoadingIndicator={this.state.isLoadingDatas}
                    refreshing={this.state.isRefreshingCalendar}
                    selected={Platform.OS === 'android' ? firstDateOfData : undefined}
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
                        agendaDayTextColor: primaryColor,
                        todayTextColor: primaryColor,
                        agendaDayNumColor: primaryColor,
                        agendaTodayColor: primaryColor,
                        agendaKnobColor: '#777777',
                        dotColor: primaryColor,
                        selectedDotColor: '#ffffff',
                        selectedDayBackgroundColor: primaryColor,
                        textSectionTitleColor: primaryColor,
                        textMonthFontWeight: 'bold',
                    }}
                    renderEmptyData={this.renderEmptyData}
                    renderItem={appointment => (
                        <TouchableOpacity
                            activeOpacity={this.state.isLoadingDatas ? 1 : 0.2}
                            style={styles.item}
                            onPress={() => {
                                if (!this.state.userHasTappedAppointmentRecently) {
                                    this.goToCheckInScreen(appointment)
                                }
                            }}
                        >
                            <Body style={styles.itemTextContainer}>
                                {!appointment.sync && !appointment.syncronizing && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.syncAppointmentAction(appointment)
                                        }}
                                    >
                                        <Icon name='sync-alert' type='MaterialCommunityIcons' style={styles.warningColor} />
                                    </TouchableOpacity>
                                )}
                                {!appointment.sync && appointment.syncronizing && (
                                    <RotatingIcon name='sync' type='MaterialCommunityIcons' style={styles.warningColor} />
                                )}
                                <Text style={styles.itemText}>{limitStr(appointment.clientName, 50)}</Text>
                            </Body>

                            <Right style={styles.itemIconContainer}>
                                {!!appointment.current_step && <Text style={styles.itemTextGray}>{appointment.time}</Text>}
                                {!appointment.current_step && <Icon success name='check-circle-o' type='FontAwesome' style={styles.successColor} />}
                            </Right>
                        </TouchableOpacity>
                    )}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    appointments: appointmentsWithClientSelector(state),
})
const mapDispatchToProps = {
    fetchReasonsAction,
    fetchAppointmentsAction,
    fetchClientsAction,
    deleteItemFromDatasetList,
    syncAppointmentAction,
}
AgendaWrapper = withTranslation()(AgendaWrapper)
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AgendaWrapper))
