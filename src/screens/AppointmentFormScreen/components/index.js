import React from 'react'
import { Label, Text, Icon, View, Button } from 'native-base'
import { useTranslation } from 'react-i18next'
import Modal from 'react-native-modal'
import MapView from 'react-native-maps'
import styles, { brandPrimary } from '../styles'
export { default as ClientInput } from './ClientInput'
export { default as ReasonInput } from './ReasonInput'

export const LocationLabel = () => {
    let { t } = useTranslation()
    return <Label style={styles.labelPadder}>{t('location') + ':'}</Label>
}
export const MapButton = ({ onPressButton, mapModalIsVisible = false, mapOnLongPress = () => {}, initialRegion, latitude, longitude }) => {
    let { t } = useTranslation()

    return (
        <View style={{ flex: 1 }}>
            <Button style={{ alignSelf: 'flex-end', backgroundColor: !!latitude ? 'green' : brandPrimary }} onPress={onPressButton} >
                <Text>{t('map')}</Text>
            </Button>
            <Modal avoidKeyboard isVisible={mapModalIsVisible} onBackdropPress={onPressButton}>
                <View style={{ overflow: 'hidden', borderRadius: 5 }}>
                    <MapView
                        showsMyLocationButton
                        style={{ width: '100%', height: '90%', borderRadius: 5 }}
                        showsUserLocation
                        zoomEnabled
                        zoomTapEnabled
                        zoomControlEnabled
                        loadingEnabled
                        rotateEnabled={false}
                        moveOnMarkerPress
                        onLongPress={mapOnLongPress}
                        initialRegion={!!initialRegion.latitude ? initialRegion : undefined}
                    >
                        {!!latitude && !!longitude && <MapView.Marker coordinate={{ latitude, longitude }} draggable />}
                    </MapView>
                    <Icon type='AntDesign' name='close' onPress={onPressButton} style={[styles.closeIcon, styles.colorPrimary]} />
                </View>
            </Modal>
        </View>
    )
}
export const SelectClientLabel = props => {
    let { t } = useTranslation()
    return <Text {...props}>{t('select_client')}</Text>
}
export const ReasonLabel = () => {
    let { t } = useTranslation()
    return <Label>{t('reason') + ':'}</Label>
}
export const DateLabel = () => {
    let { t } = useTranslation()
    return <Label style={styles.labelPadder}>{t('date') + ':'}</Label>
}
export const AcceptLabel = () => {
    let { t } = useTranslation()
    return <Text>{t('accept')}</Text>
}
export const CancelLabel = () => {
    let { t } = useTranslation()
    return <Text>{t('cancel')}</Text>
}
export const UpdateLabel = props => {
    let { t } = useTranslation()
    return <Text {...props}>{t('update')}</Text>
}
export const ScheduleLabel = props => {
    let { t } = useTranslation()
    return <Text {...props}>{t('schedule')}</Text>
}

export const SelectIconDropdown = () => (
    <View style={{ flex: 1 }}>
        <Icon style={{ alignSelf: 'flex-end', paddingRight: 10 }} name='arrow-down' />
    </View>
)
