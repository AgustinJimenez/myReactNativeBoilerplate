import React from 'react'
import { Platform } from 'react-native'
import { Card, CardItem, Body, Form, Text, Label, Item, Textarea, Button, Left, Content, Icon, Picker, Spinner } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'
import MapView from 'react-native-maps'
import HeaderTitle from '../../components/HeaderTitle'
import styles, { brandPrimary } from './styles'
import { withNavigation } from 'react-navigation'

import { formatDate, convertToDate, dateForSystemFormat, dateForUsersFormat } from '../../utils/dateFormat'
import Geolocation from 'react-native-geolocation-service'
import { connect } from 'react-redux'
import { pushNewItemToDatasetList, updateItemToDatasetList } from '../../actions'
import Appointment from '../../models/Appointment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import showToast from '../../utils/showToast'
import { HoursBeforeNotificationsLabel, LocationLabel, ClientLabel, SelectClientLabel, ReasonLabel, DateLabel, AcceptLabel, CancelLabel, UpdateLabel, ScheduleLabel } from './components'
import Select from '../../components/utils/Select'
import { hoursBeforeAppointmentNotificationSelector } from '../../selectors/datasetsSelector'

//import JSONTree from 'react-native-json-tree'
class AppointmentForm extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: <HeaderTitle trans_id='new_appointment' />,

    })
    state = {
        region_latitude: null,
        region_longitude: null,
        isDateTimePickerVisible: false,
        ubicationReady: false,
        isSubmiting: false,
        ...new Appointment().getDatas(),
    }
    getFormType = _ => this.props.navigation.getParam('formType', 'new')
    formTypeIsNew = _ => this.getFormType() === 'new'
    componentDidMount() {
        var appointment = new Appointment(this.props.navigation.getParam('appointment'))

        if (!this.formTypeIsNew())
            this.setState({
                ubicationReady: true,
                region_latitude: appointment.ubication_latitude,
                region_longitude: appointment.ubication_longitude,
                ...appointment,
                hours_before_notification: appointment.hours_before_notification
            })
        else {
            //Geolocation.requestAuthorization()
            Geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) =>
                    this.setState(state => {
                        state = { ...state, ...appointment }
                        state.hours_before_notification = appointment.hours_before_notification
                        state.region_latitude = latitude
                        state.region_longitude = longitude
                        state.ubication_latitude = latitude
                        state.ubication_longitude = longitude
                        state.ubicationReady = true

                        return state
                    }),
                error => {
                    this.setState({ ubicationReady: true, ...appointment })
                    showToast(`ERROR: ${error.message}`, { type: 'danger' })
                    this.props.navigation.goBack()
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, forceRequestLocation: true },
            )
        }
    }
    getClient = _ => this.state.client_id
    getHoursBeforeNotification = _ => this.state.client_id
    getUbication = _ => ({
        latitude: this.state.ubication_latitude,
        longitude: this.state.ubication_longitude,
    })
    getRegion = _ => ({
        latitude: this.state.region_latitude,
        longitude: this.state.region_longitude,
    })
    getReason = _ => this.state.reason || ''
    getDateTime = _ => {
        if (!!this.state.datetime) return convertToDate(this.state.datetime, dateForSystemFormat)

        return null
    }
    formIsDisabled = _ => {
        if (this.state.isSubmiting) return true

        if (!this.getClient()) return true
        else if (this.getReason().trim() === '') return true
        else if (!this.getDateTime()) return true
        else if (!this.state.ubication_latitude && !this.state.ubication_longitude) return true

        return false
    }
    getClients = _ => [
        { value: 1, label: 'Cliente A' },
        { value: 2, label: 'Cliente B' },
        { value: 3, label: 'Cliente C' },
        { value: 4, label: 'Cliente D' },
    ]
    showDateTimePicker = (isDateTimePickerVisible = true) => this.setState({ isDateTimePickerVisible })
    hideDateTimePicker = (isDateTimePickerVisible = false) => this.setState({ isDateTimePickerVisible })
    handleDatePicked = datetime => {
        let dateTimeSystemFormated = formatDate(datetime, dateForSystemFormat)
        this.setState({ datetime: dateTimeSystemFormated })
        this.hideDateTimePicker()
    }
    getHoursBeforeNotification = _ => this.props.hours_before_notification.data
    submit = async _ => {
        this.setState({ isSubmiting: true })

        let appointment = new Appointment(this.state)

        if (this.formTypeIsNew()) {
            appointment.beforeCreate({ hoursBeforeAppointmentNotification: this.getHoursBeforeNotification() })
            this.props.pushNewItemToDatasetList(appointment.getDatas(), 'appointments')
        } else {
            appointment.sync = false
            this.props.updateItemToDatasetList(appointment.getDatas(), 'appointments')
        }

        this.setState({ isSubmiting: false })
        this.props.navigation.goBack()
    }
    renderMapField = _ => {
        let region = this.getRegion()
        let { latitude, longitude } = this.getUbication()

        if (!!region.latitude && !!region.longitude)
            return (
                <React.Fragment>
                    <LocationLabel />
                    <Item regular>
                        <MapView
                            showsMyLocationButton
                            style={{ width: '100%', height: 200 }}
                            showsUserLocation
                            zoomEnabled
                            zoomTapEnabled
                            zoomControlEnabled
                            loadingEnabled
                            rotateEnabled={false}
                            moveOnMarkerPress
                            onLongPress={e => {
                                this.setState({
                                    ubication_latitude: e.nativeEvent.coordinate.latitude,
                                    ubication_longitude: e.nativeEvent.coordinate.longitude,
                                })
                            }}
                            initialRegion={{
                                ...region,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            {!!latitude && !!longitude && <MapView.Marker coordinate={{ latitude, longitude }} draggable />}
                        </MapView>
                    </Item>
                </React.Fragment>
            )
    }

    render() {
        let datetime = this.getDateTime()
        let clientsPickerList = []

        if (Platform.OS === 'android') clientsPickerList = [{ label: <SelectClientLabel />, value: null }].concat(this.getClients())
        else clientsPickerList = this.getClients()

        let hours_before_notification = this.state.hours_before_notification

        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
                <Content padder>
                    <Form>
                        {!this.state.ubicationReady && <Spinner color={brandPrimary} />}
                        {this.state.ubicationReady && (
                            <Card>
                                <HoursBeforeNotificationsLabel
                                    hours_before_notification={hours_before_notification}
                                    mustShow={!this.formTypeIsNew()}
                                />
                                <CardItem>
                                    <Body>

                                        <ClientLabel />
                                        <Item regular>
                                            <Left>
                                                <Select
                                                    placeholder='select_client'
                                                    style={{ backgroundColor: 'white' }}
                                                    iosHeader='select_client'
                                                    selectedValue={this.getClient()}
                                                    onValueChange={client_id => this.setState({ client_id })}
                                                >
                                                    {
                                                        clientsPickerList.map((item, key) => (
                                                            <Picker.Item key={key} label={item.label} value={item.value} />
                                                        ))
                                                    }
                                                </Select>
                                            </Left>
                                        </Item>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <ReasonLabel />
                                        <Textarea
                                            style={{ width: '100%', backgroundColor: 'white' }}
                                            rowSpan={3}
                                            bordered
                                            //placeholder={}
                                            value={this.getReason() || ''}
                                            autoCorrect={false}
                                            onChangeText={reason => this.setState({ reason })}
                                        />
                                    </Body>
                                </CardItem>
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

                                <CardItem>
                                    <Body>{this.renderMapField()}</Body>
                                </CardItem>

                                <CardItem>
                                    <Body>
                                        <Button disabled={this.formIsDisabled()} full onPress={_ => this.submit()}>
                                            <Text>{this.renderSubmitButtonTitle()}</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                        )}
                        {/* <JSONTree data={this.state} /> */}
                    </Form>
                </Content>
            </KeyboardAwareScrollView>
        )
    }

    renderSubmitButtonTitle = _ => {
        if (this.state.isSubmiting) return <Spinner color='white' />

        if (this.props.navigation.getParam('formType', 'new') === 'new') return <ScheduleLabel style={{ color: 'white' }} />

        return <UpdateLabel style={{ color: 'white' }} />
    }
}
const mapStateToProps = state => ({
    hours_before_notification: hoursBeforeAppointmentNotificationSelector(state),
})
const mapDispatchToProps = {
    pushNewItemToDatasetList,
    updateItemToDatasetList,
}
//AppointmentForm = withTranslation()(AppointmentForm)
AppointmentForm = withNavigation(AppointmentForm)
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm)
