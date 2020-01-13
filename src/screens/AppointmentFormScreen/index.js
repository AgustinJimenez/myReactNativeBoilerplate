import React from 'react'
import { Card, CardItem, Body, Form, Text, Button, Content, Spinner } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'
import HeaderTitle from '../../components/HeaderTitle'
//import { brandPrimary } from './styles'
import { withNavigation } from 'react-navigation'
import { formatDate, convertToDate, dateForSystemFormat, dateForUsersFormat } from '../../utils/dateFormat'
import Geolocation from 'react-native-geolocation-service'
import { connect } from 'react-redux'
import { syncAppointmentsAction, createAppointment } from '../../actions'
import Appointment from '../../models/Appointment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import showToast from '../../utils/showToast'
import { LocationLabel, ClientInput, ReasonInput, DateLabel, AcceptLabel, CancelLabel, UpdateLabel, ScheduleLabel, MapButton } from './components'
import { authSelector } from '../../selectors/datasetsSelector'
//import JSONTree from 'react-native-json-tree'

class AppointmentForm extends React.Component {
    static navigationOptions = props => {
        let isNew = props.navigation.getParam('formType', 'new') === 'new'
        return {
            headerTitle: <HeaderTitle trans_id={isNew ? 'new_appointment' : 'edit_appointment'} />,
        }
    }
    timer
    state = {
        region_latitude: null,
        region_longitude: null,
        isDateTimePickerVisible: false,
        ubicationReady: false,
        isSubmiting: false,
        mapModalIsVisible: false,
        appointment: {},
    }
    getFormType = () => this.props.navigation.getParam('formType', 'new')
    formTypeIsNew = () => this.getFormType() === 'new'
    componentDidMount() {
        let appointment = new Appointment(this.props.navigation.getParam('appointment'))
        console.log('DID-MOUNT===> ', { appointment })
        if (!this.formTypeIsNew())
            this.setState({
                ubicationReady: true,
                region_latitude: appointment.ubication_latitude,
                region_longitude: appointment.ubication_longitude,
                appointment,
            })
        else {
            //Geolocation.requestAuthorization()
            Geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) =>
                    this.setState(state => {
                        state.region_latitude = latitude
                        state.region_longitude = longitude
                        state.appointment = appointment
                        state.ubicationReady = true
                        return state
                    }),
                error => {
                    this.setState(state => {
                        state.ubicationReady = true
                        state.appointment = appointment
                        return state
                    })
                    showToast(`ERROR: ${error.message}`, { type: 'danger' })
                    this.props.navigation.goBack()
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, forceRequestLocation: true },
            )
        }
    }
    getClient = () => this.appointment().client_id
    getUbication = () => ({ ...this.appointment().ubication })
    getRegion = () => ({
        latitude: this.state.region_latitude,
        longitude: this.state.region_longitude,
    })
    getReasons = () => {
        let appointment = this.appointment()
        let reasons = appointment.reasons || []
        return [...reasons]
    }
    getDateTime = () => {
        let datetime = this.appointment().datetime
        if (!!datetime) return convertToDate(datetime, dateForSystemFormat)

        return null
    }
    formIsDisabled = () => {
        let isDisabled = false
        let ubication = this.getUbication()
        if (this.state.isSubmiting || !this.getClient() || !this.getReasons() || !this.getDateTime() || (!ubication.latitude && !ubication.longitude))
            isDisabled = true

        return isDisabled
    }
    showDateTimePicker = (isDateTimePickerVisible = true) => this.setState({ isDateTimePickerVisible })
    hideDateTimePicker = (isDateTimePickerVisible = false) => this.setState({ isDateTimePickerVisible })
    handleDatePicked = datetime => {
        this.setState(state => {
            state['appointment']['appointment_date'] = formatDate(datetime, dateForSystemFormat)
            return state
        }, this.hideDateTimePicker)
    }
    appointment = () => this['state']['appointment']
    submit = async () => {
        await this.setState({ isSubmiting: true })
        let onFinish = () => {
            //this.setState({ isSubmiting: false })
            this.props.syncAppointmentsAction()
            this.props.navigation.goBack()
        }

        if (this.formTypeIsNew()) {
            let data = this.appointment().getDatas()
            data.reasons = data.reasons.map(({ id }) => id)
            data = new Appointment(data).getDatas()
            this.props.createAppointment(data, onFinish)
        }
    }
    renderMapField = () => {
        //if (this.state.ubicationReady) return <Spinner color={brandPrimary} />
        let region = this.getRegion()
        let { latitude, longitude } = this.getUbication()
        //if (!!region.latitude && !!region.longitude)
        return (
            <React.Fragment>
                <LocationLabel />
                <MapButton
                    mapOnLongPress={({ nativeEvent: { coordinate } }) => {
                        this.setState(state => {
                            state['appointment'].setUbication(coordinate)
                            return state
                        })
                    }}
                    initialRegion={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    latitude={latitude}
                    longitude={longitude}
                    mapModalIsVisible={this.state.mapModalIsVisible}
                    onPressButton={() => this.setState({ mapModalIsVisible: !this.state.mapModalIsVisible })}
                />
            </React.Fragment>
        )
    }
    renderClientInput = () => {
        console.log('HERE ===> ', { state: this.state })
        return (
            <ClientInput
                onValueChange={client_id => {
                    this.setState(state => {
                        if (!!state['appointment']['header']) {
                            state['appointment']['header']['people_in_id'] = client_id
                            console.log('CLIENT-INPUT-ID ===> ', {
                                client_id,
                                appointment: state['appointment'],
                                header: state['appointment']['header'],
                                people_in_id: state['appointment']['header']['people_in_id'],
                            })
                        }
                        //console.log('CLIENT-UPDATE ====> ', { header: state['appointment']['header'] })
                        return state
                    })
                }}
                selectedValue={this.getClient()}
            />
        )
    }
    renderReasonInput = () => {
        let reasons = this.getReasons()
        return (
            <ReasonInput
                selectedsReasons={reasons}
                onValueChange={newReasons => {
                    this.setState(state => {
                        state['appointment']['reasons'] = newReasons
                        return state
                    })
                }}
            />
        )
    }
    renderDateTimeInput = () => {
        let datetime = this.getDateTime()
        return (
            <CardItem>
                <Body>
                    <DateLabel />
                    <Button
                        full
                        onPress={this.showDateTimePicker}
                        style={{ width: '100%', backgroundColor: 'white', borderColor: '#ddd', color: 'black' }}
                        bordered
                        info
                    >
                        <Text>{!!datetime ? formatDate(datetime, dateForUsersFormat) : ''}</Text>
                        <DateTimePicker
                            hideTitleContainerIOS
                            is24Hour
                            //locale={this.props.i18n.language === 'es' ? 'es_PY' : undefined}
                            locale='es_PY'
                            date={datetime || undefined}
                            confirmTextIOS={<AcceptLabel />}
                            cancelTextIOS={<CancelLabel />}
                            isVisible={Boolean(this.state.isDateTimePickerVisible)}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            mode='datetime'
                        />
                    </Button>
                </Body>
            </CardItem>
        )
    }
    renderSubmitButton = () => (
        <CardItem>
            <Body>
                <Button
                    disabled={this.formIsDisabled()}
                    full
                    onPress={() => {
                        clearTimeout(this.timer)
                        this.timer = setTimeout(this.submit, 20)
                    }}
                >
                    {this.renderSubmitButtonTitle()}
                </Button>
            </Body>
        </CardItem>
    )
    renderMapInput = () => (
        <CardItem>
            <Body style={{ flexDirection: 'row' }}>{this.renderMapField()}</Body>
        </CardItem>
    )
    renderSubmitButtonTitle = () => {
        if (this.state.isSubmiting) return <Spinner color='white' />

        if (this.props.navigation.getParam('formType', 'new') === 'new') return <ScheduleLabel style={{ color: 'white' }} />

        return <UpdateLabel style={{ color: 'white' }} />
    }
    renderForm = () => {
        return (
            <Form>
                <Card>
                    {this.renderClientInput()}
                    {this.renderReasonInput()}
                    {this.renderDateTimeInput()}
                    {this.renderMapInput()}
                    {this.renderSubmitButton()}
                </Card>
            </Form>
        )
    }
    render = () => (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
            <Content padder>
                {this.renderForm()}
                {/* <JSONTree data={this.state.appointment} /> */}
            </Content>
        </KeyboardAwareScrollView>
    )
}
const mapStateToProps = state => ({
    auth: authSelector(state),
})
const mapDispatchToProps = {
    createAppointment,
    syncAppointmentsAction,
}
//AppointmentForm = withTranslation()(AppointmentForm)
AppointmentForm = withNavigation(AppointmentForm)
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm)
