import React from 'react'
import { Card, CardItem, Button, Icon, Body, Label, Text } from 'native-base'
import { Platform, Linking } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import styles, { brandPrimary } from '../styles'
//import { STEPS } from '../../../constants'
import Geolocation, { GeoWatchOptions } from 'react-native-geolocation-service'
import { useTranslation } from 'react-i18next'
import Modal from 'react-native-modal'
//import { useDispatch } from 'react-redux'

const GeolocationConfig: GeoWatchOptions = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 10000,
    distanceFilter: 20,
    showLocationDialog: true,
    forceRequestLocation: true,
    useSignificantChanges: true,
}
/* 
const distance = (origin: any, destination: any) => {
    let lat1 = origin.latitude
    let lon1 = origin.longitude
    let lat2 = destination.latitude
    let lon2 = destination.longitude
    let unit = 'K'

    let radlat1 = (Math.PI * lat1) / 180
    let radlat2 = (Math.PI * lat2) / 180
    let theta = lon1 - lon2
    let radtheta = (Math.PI * theta) / 180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * (unit == 'K' ? 1.609344 : 0.8684)
    return dist.toFixed(3)
}
 */
const watchUserUbication = ({ onChangeValue, destination, openMapUrl, canOpenMap, setOpenMapUrl, setCanOpenMap, value }: any) => {
    //console.log('watchUserUbication params===> ', { onChangeValue, destination, openMapUrl, canOpenMap, setOpenMapUrl, setCanOpenMap })
    var watchPositionId = Geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
            let newValue: string = JSON.stringify({
                lat: latitude,
                lng: longitude,
            })
            let valueObj = JSON.parse(value) || { lat: null, lng: null }
            let valueHasChanged =
                `${valueObj.lat}`.slice(0, -3) !== `${latitude}`.slice(0, -3) && `${valueObj.lng}`.slice(0, -3) !== `${longitude}`.slice(0, -3)
            /* 
            console.log(
                `CHANGES ===> `,
                `${valueObj.lat}`.slice(0, -3),
                `${latitude}`.slice(0, -3),
                `${valueObj.lng}`.slice(0, -3),
                `${longitude}`.slice(0, -3),
            )
            console.log('watchUserUbication event', { value, valueObj, newValue: { latitude, longitude }, valueHasChanged })
            */
            if (valueHasChanged) onChangeValue(newValue)
            setMapAvailability(destination, openMapUrl, canOpenMap, setOpenMapUrl, setCanOpenMap)
        },
        error => {
            console.log('watchUserUbication - error ==> ', { error })
            setTimeout(() => {
                watchUserUbication({ onChangeValue, destination, openMapUrl, canOpenMap, setOpenMapUrl, setCanOpenMap, value })
            }, 1000)
            //console.log(error.code, error.message)
        },
        GeolocationConfig,
    )
}

const OpenMapButtons = ({ openMapUrl, canOpenMap }: any) => {
    return (
        <CardItem>
            <Body>
                <Button block style={styles.openMapButton} onPress={() => Linking.openURL(openMapUrl)}>
                    <Icon name='map-marked' type='FontAwesome5' style={styles.openMapButtonIcon} />
                </Button>
            </Body>
        </CardItem>
    )
}
const setMapAvailability = async (destination: any, openMapUrl: string, canOpenMap: boolean, setOpenMapUrl: Function, setCanOpenMap: Function) => {
    let scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
    let map_url = `${scheme}${destination.latitude},${destination.longitude}`
    let canOpenMapTmp = await Linking.canOpenURL(map_url)
    if (map_url !== openMapUrl) setOpenMapUrl(map_url)
    /* if (canOpenMapTmp !== canOpenMap)  */ setCanOpenMap(canOpenMapTmp)
}
const MapInput = ({ onChangeValue, label_id, placeholder_id, destination, value }: any) => {
    //console.log('MAP INPUT RENDER !!!', { value, destination })
    //let destination = appointment.ubication
    let { t } = useTranslation()
    //console.log('MAP-COMPONENT === >', { value, destination, label_id, placeholder_id })
    const [openMapUrl, setOpenMapUrl] = React.useState('')
    const [canOpenMap, setCanOpenMap] = React.useState(false)
    const [mapStyleAnyValue, setMapStyleAnyValue] = React.useState(1)
    const [mapVisibility, setMapVisibility] = React.useState(false)
    let parsedValue = !!value ? JSON.parse(value) : { lat: null, lng: null }
    //if (!parsedValue || !parsedValue.lat || !parsedValue.lng) return <Spinner color={brandPrimary} />
    var origin = {
        latitude: parsedValue.lat,
        longitude: parsedValue.lng,
    }
    React.useEffect(() => {
        watchUserUbication({ onChangeValue, destination, openMapUrl, canOpenMap, setOpenMapUrl, setCanOpenMap, value })
    }, [])

    return (
        <React.Fragment>
            <Modal isVisible={mapVisibility} onBackdropPress={() => setMapVisibility(false)} onBackButtonPress={() => setMapVisibility(false)}>
                <Card>
                    <CardItem>
                        <Body>
                            <Label>{`${t(label_id)}:`}</Label>
                            <Icon type='AntDesign' name='close' onPress={() => setMapVisibility(false)} style={[styles.closeIcon, styles.colorPrimary]} />
                        </Body>
                    </CardItem>
                    <CardItem>
                        <MapView
                            style={[styles.map, { height: 350 + mapStyleAnyValue }]}
                            onMapReady={() => {
                                setMapStyleAnyValue(0)
                            }}
                            loadingEnabled
                            showsMyLocationButton
                            showsUserLocation
                            zoomEnabled
                            zoomControlEnabled
                            initialRegion={{
                                latitude: destination.latitude,
                                longitude: destination.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={destination} />
                            {!!origin.latitude && <Marker coordinate={origin} pinColor='green' />}
                        </MapView>
                    </CardItem>
                    <OpenMapButtons openMapUrl={openMapUrl} canOpenMap={canOpenMap} />
                    {/* 
                    <CardItem>
                        <Body>
                            <Button
                                block
                                style={styles.openMapButton}
                                onPress={() => {
                                    watchUserUbication({ onChangeValue, destination, openMapUrl, canOpenMap, setOpenMapUrl, setCanOpenMap, value })
                                }}
                            >
                                <Icon name='my-location' type='MaterialIcons' style={styles.openMapButtonIcon} />
                            </Button>
                        </Body>
                    </CardItem>
                    */}
                </Card>
            </Modal>
            <Card>
                <CardItem>
                    <Body style={{ flex: 1, flexDirection: 'row' }}>
                        <Label style={{ flex: 1 }}>{`${t(label_id)}:`}</Label>
                        <Button style={{ backgroundColor: !!value ? 'green' : brandPrimary }} onPress={() => setMapVisibility(true)}>
                            <Text>{t('map')}</Text>
                        </Button>
                    </Body>
                </CardItem>
            </Card>
        </React.Fragment>
    )
}
export default MapInput
