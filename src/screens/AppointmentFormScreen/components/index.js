import React from 'react'
import { Label, Text, Icon, View, CardItem, Body } from 'native-base'
import { useTranslation } from 'react-i18next'
import styles from '../styles'

export const LocationLabel = _ => {
    let { t } = useTranslation()
    return <Label style={styles.labelPadder}>{t('location') + ':'}</Label>
}
export const ClientLabel = _ => {
    let { t } = useTranslation()
    return <Label style={styles.labelPadder}>{t('client') + ':'}</Label>
}
export const SelectClientLabel = props => {
    let { t } = useTranslation()
    return <Text {...props}>{t('select_client')}</Text>
}
export const ReasonLabel = _ => {
    let { t } = useTranslation()
    return <Label>{t('reason') + ':'}</Label>
}
export const DateLabel = _ => {
    let { t } = useTranslation()
    return <Label style={styles.labelPadder}>{t('date') + ':'}</Label>
}
export const AcceptLabel = _ => {
    let { t } = useTranslation()
    return <Text>{t('accept')}</Text>
}
export const CancelLabel = _ => {
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

export const SelectIconDropdown = _ => (
    <View style={{ flex: 1 }}>
        <Icon style={{ alignSelf: 'flex-end', paddingRight: 10 }} name='arrow-down' />
    </View>
)

export const HoursBeforeNotificationsLabel = ({ mustShow, hours_before_notification }) => {

    if (!mustShow)
        return null

    let { t } = useTranslation()

    return (
        <CardItem>
            <Body>
                <Label style={{ fontSize: 15 }}>
                    {
                        `${t('appointment_notification')}: ${hours_before_notification} ${t('hours_before')}`
                    }
                </Label>
            </Body>
        </CardItem>
    )
}
