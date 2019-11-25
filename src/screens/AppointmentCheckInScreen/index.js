import React from 'react'
import { Platform, Linking } from 'react-native'
import { Content, Card, Grid, Row, Col, List, Body, Container, Button, Text, Spinner, Icon, ListItem } from 'native-base'
import MapView from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { appointmentSelector } from '../../selectors/datasetsSelector'
import { updateItemToDatasetList } from '../../actions'
import styles, { brandPrimary } from './styles'
import HeaderTitle from '../../components/HeaderTitle'
import { StackActions, NavigationActions, withNavigation } from 'react-navigation'
import showToast from '../../utils/showToast'

class AppointmentCheckInScreen extends React.Component {

    static navigationOptions = props => {
        console.log('appointment check in screen navigationOptions ===> ', props)
        return {
            headerTitle: <HeaderTitle trans_id='appointment' />,
        }
    }

    state = {
        ready: false,
        current_location_latitude: null,
        current_location_longitude: null,
        mapsAppIsSupported: false,
        distanceFromDestination: null,
        openMapsUrl: null
    }

    componentDidMount() {
        this.watchUserUbication()
        this.appointmentValidation()
    }
    appointmentValidation = _ => {
        if (this.appointment().isFinished())
            this.props.navigation.goBack()
    }
    getCurrentLocation = _ => ({
        latitude: this.state.current_location_latitude,
        longitude: this.state.current_location_longitude
    })

    getAppointmentUbication = _ => ({
        latitude: this.props.appointment.ubication_latitude,
        longitude: this.props.appointment.ubication_longitude
    })
    watchUserUbication = _ =>
        Geolocation.watchPosition(
            ({ coords: { latitude, longitude } }) => {

                this.setState(state => {
                    state.current_location_latitude = latitude
                    state.current_location_longitude = longitude
                    state.ready = true

                    return state
                }, this.setMapsAppAvailability)

            },
            error =>
                this.setState({ ready: true })
            //console.log(error.code, error.message)
            ,
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 0 },
        )
    setMapsAppAvailability = async _ => {
        let destination = this.getAppointmentUbication()
        let scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
        await this.setState({
            openMapsUrl: `${scheme}${destination.latitude},${destination.longitude}`
        })
        let canOpenMapsApp = await Linking.canOpenURL(this.state.openMapsUrl)
        if (canOpenMapsApp && !this.state.mapsAppIsSupported)
            this.setState({ mapsAppIsSupported: true })
    }
    distance = _ => {
        let origin = this.getCurrentLocation()
        let destination = this.getAppointmentUbication()
        let lat1 = origin.latitude
        let lon1 = origin.longitude
        let lat2 = destination.latitude
        let lon2 = destination.longitude
        let unit = 'K'

        let radlat1 = Math.PI * lat1 / 180
        let radlat2 = Math.PI * lat2 / 180
        let theta = lon1 - lon2
        let radtheta = Math.PI * theta / 180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        dist = dist * (unit == "K" ? 1.609344 : 0.8684)
        return dist.toFixed(3)
    }
    appointment = _ => this.props.appointment
    checkInAppointment = _ => {
        let appointment = this.appointment()
        appointment.checkInAppointment()
        this.props.updateItemToDatasetList(appointment.getDatas(), 'appointments')
        showToast(this.props.t('appointment_place_was_assigned'), { type: 'success' })
    }
    finishAppointment = _ => {
        let appointment = this.appointment()
        appointment.finishAppointment()
        this.props.updateItemToDatasetList(appointment.getDatas(), 'appointments')
        showToast(this.props.t('appointment_was_finished'), { type: 'success' })
    }
    goToAppointmentForm = async _ => {
        let resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'AppointmentForm' }),
            ],
        })
        this.props.navigation.replace('BlankTransition', { callback: _ => this.props.navigation.dispatch(resetAction) })
    }
    render() {
        return (
            <Container>
                <Content padder>
                    {
                        !this.state.ready
                            ? <Spinner color={brandPrimary} />
                            : (

                                <Card>
                                    <List>
                                        {this.renderMap()}
                                        {this.renderCheckInButton()}
                                        {this.renderMapsAppLink()}
                                        {this.renderInterestButtons()}
                                        {this.renderAddNewAppointment()}
                                    </List>
                                </Card>
                            )
                    }
                </Content>
            </Container>
        )
    }
    renderMap = _ => {
        let origin = this.getCurrentLocation()
        let destination = this.getAppointmentUbication()

        return (
            <ListItem itemHeader first>
                {
                    !!origin.latitude && !!origin.longitude && (
                        <MapView
                            loadingEnabled
                            showsMyLocationButton
                            showsUserLocation
                            zoomEnabled
                            loadingEnabled
                            cacheEnabled
                            zoomControlEnabled
                            style={styles.map}
                            initialRegion={{
                                ...origin,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >

                            {!!destination.latitude && <MapView.Marker coordinate={destination} />}
                        </MapView>)
                }
            </ListItem>
        )
    }
    renderInterestButtons = _ => {
        let appointment = this.appointment()

        if (appointment.isCheckedIn() && !appointment.isFinished())
            return (
                <ListItem noBorder>
                    <Body>
                        <Grid>
                            <Row>
                                <Col>
                                    <Button
                                        onPress={this.finishAppointment}
                                    >
                                        <Text>{this.props.t('interesed')}</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        style={{
                                            alignSelf: 'flex-end'
                                        }}
                                        onPress={this.finishAppointment}
                                    >
                                        <Text>{this.props.t('not_interesed')}</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Grid>
                    </Body>
                </ListItem>
            )
    }
    renderAddNewAppointment = _ => {
        if (this.appointment().isFinished())
            return (
                <ListItem noBorder>
                    <Body>
                        <Button
                            block
                            onPress={_ => this.goToAppointmentForm()}
                        >
                            <Text>{this.props.t('add_new_appointment')}</Text>
                        </Button>
                    </Body>
                </ListItem>
            )
    }
    renderCheckInButton = _ => {
        let appointment = this.appointment()

        //let isFinished = appointment.isFinished()
        if (!appointment.isCheckedIn())
            return (
                <ListItem noBorder>
                    <Body>
                        <Button
                            block
                            onPress={this.checkInAppointment}
                        >
                            <Text>{this.props.t('check_in')}</Text>
                        </Button>
                    </Body>
                </ListItem>
            )
    }
    renderMapsAppLink = _ => {
        if (this.state.mapsAppIsSupported && !this.appointment().isCheckedIn())
            return (
                <ListItem noBorder>
                    <Body>
                        <Button block style={styles.openMapButton} onPress={_ => Linking.openURL(this.state.openMapsUrl)} >
                            <Icon name='map-marked' type='FontAwesome5' style={styles.openMapButtonIcon} />
                        </Button>
                    </Body>
                </ListItem>
            )
    }


}
const mapStateToProps = (state, props) => ({
    appointment: appointmentSelector(state, props.navigation.getParam('appointment')),
})
const mapDispatchToProps = {
    updateItemToDatasetList
}
AppointmentCheckInScreen = withNavigation(AppointmentCheckInScreen)
AppointmentCheckInScreen = withTranslation()(AppointmentCheckInScreen)
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppointmentCheckInScreen)