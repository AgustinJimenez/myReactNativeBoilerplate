import React from 'react'
import { Icon, Button, Spinner } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { networkSelector, outOfSyncAppointmentsSelector, othersSelector } from '../../selectors/datasetsSelector'
import { colors } from '../../theme/variables/commonStyles'
import { syncAppointmentsAction } from '../../actions'

const RightIcon = props => {
    let dispatch = useDispatch()
    let others = useSelector(othersSelector)
    let network = useSelector(networkSelector)
    let appointments = useSelector(outOfSyncAppointmentsSelector)
    if (others.appointmentsAreSynchronizing) return <Spinner size='small' color={colors.toolbarBtnTextColor} style={{ marginRight: 10 }} />

    let iconData = { color: 'white', name: 'wifi', disabled: true }

    if (!network.isConnected) {
        iconData.name = 'wifi-strength-off-outline'
        iconData.color = 'white'
    }

    if (appointments.length > 0) {
        iconData.name = 'wifi-strength-4-alert'
        iconData.disabled = false
    } else iconData.name = 'wifi'

    return (
        <Button
            transparent
            disabled={iconData.disabled}
            onPress={e => {
                dispatch(syncAppointmentsAction())
            }}
        >
            <Icon
                type='MaterialCommunityIcons'
                name={iconData.name}
                style={{
                    fontSize: 20,
                    color: 'white',
                }}
            />
        </Button>
    )
}
export default RightIcon
