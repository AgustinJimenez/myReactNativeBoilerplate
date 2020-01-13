import React from 'react'
import { Text, Card, CardItem, Left, Label, Body, Right } from 'native-base'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { reasonsSelector } from '../../../selectors/datasetsSelector.js'
import { STEPS } from '../../../constants'
import MapView, { Marker } from 'react-native-maps'
import styles, { brandPrimary } from '../styles'
import showToast from '../../../utils/showToast'
import { NavigationContext } from 'react-navigation'

const AppointmentInfo = ({ appointment }: any) => {
    let { t } = useTranslation()
    var navigation = React.useContext(NavigationContext)
    if (!appointment['id_on_device']) {
        showToast(t('invalid_appointment'))
        navigation.goBack()
    }
    let reasons = useSelector(reasonsSelector)
    var reason: any = {}
    return (
        <Card style={{ borderBottomColor: brandPrimary, borderBottomWidth: 2 }}>
            <CardItem>
                <Left>
                    <Label>{`${t('client')}:`}</Label>
                </Left>
                <Body>
                    <Text>{appointment.clientName}</Text>
                </Body>
            </CardItem>
            <CardItem header>
                <Body>
                    <Label>{`${t('reasons')}:`}</Label>
                </Body>
            </CardItem>
            <CardItem cardBody>
                <Body>
                    <Left>
                        {!!appointment &&
                            !!appointment.reasons &&
                            Array.isArray(appointment.reasons) &&
                            appointment.reasons.map((id: any, key: any) => {
                                reason = {}
                                reasons.some((re: any) => {
                                    if (re.id === id) {
                                        reason = re
                                        return true
                                    }
                                })

                                return <Text key={key}>{'-' + reason.name}</Text>
                            })}
                    </Left>
                </Body>
            </CardItem>
            <CardItem>
                <Left>
                    <Label>{`${t('date')}:`}</Label>
                </Left>
                <Body>
                    <Text>{appointment.getDateTimeFormated}</Text>
                </Body>
            </CardItem>
            {Object.keys(appointment.step_informations).map((stepId: string, stepKey: number) => {
                if (stepId !== STEPS.SCHEDULING)
                    return appointment.step_informations[stepId].map(({ type, name, label, value }: any, fieldKey: number) => {
                        let key = `${stepKey}-${fieldKey}`
                        if (!value) return
                        else if (type === 'textarea')
                            return (
                                <React.Fragment key={key}>
                                    <CardItem header>
                                        <Body>
                                            <Label>{`${t(label)}:`}</Label>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Right>
                                            <Text>{value}</Text>
                                        </Right>
                                    </CardItem>
                                </React.Fragment>
                            )
                        else if (type === 'location' && appointment['current_step'] !== stepId) {
                            let { lat, lng } = JSON.parse(value) || { lat: null, lng: null }
                            let ubication = {
                                latitude: lat,
                                longitude: lng,
                            }
                            return (
                                <React.Fragment key={key}>
                                    <CardItem header>
                                        <Body>
                                            <Label>{`${t(label)}:`}</Label>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <MapView
                                                style={[styles.map, { overflow: 'hidden' }]}
                                                loadingEnabled
                                                zoomEnabled
                                                zoomControlEnabled
                                                //cacheEnabled
                                                initialRegion={{
                                                    latitude: ubication.latitude,
                                                    longitude: ubication.longitude,
                                                    latitudeDelta: 0.0922,
                                                    longitudeDelta: 0.0421,
                                                }}
                                            >
                                                <Marker pinColor='green' coordinate={ubication} />
                                            </MapView>
                                        </Body>
                                    </CardItem>
                                </React.Fragment>
                            )
                        }
                    })
            })}
        </Card>
    )
}
export default AppointmentInfo
