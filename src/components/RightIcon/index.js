import React from 'react'
import { Icon, Button, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { othersSelector, appointmentsSelector } from '../../selectors/datasetsSelector'
import { colors } from '../../theme/variables/commonStyles'
import { syncAppointments } from '../../tasks/SyncAppointmentsTask'

class RightIcon extends React.Component {
    getIconData = _ => {
        let iconData = { color: 'white', name: 'wifi', disabled: true }

        if (!this.props.others.data.network.isConnected) {
            iconData.name = 'wifi-strength-off-outline'
            iconData.color = 'white'
            return iconData
        }
        let appointmentsNotSync = this.props.appointments.data.filter(appointment => !appointment.sync) || []

        if (appointmentsNotSync.length > 0) {
            iconData.name = 'wifi-strength-4-alert'
            iconData.disabled = false
        } else iconData.name = 'wifi'

        return iconData
    }

    render() {
        if (this.props.others.data.appointmentsAreSynchronizing) return <Spinner size='small' color={colors.brandPrimary} style={{ marginRight: 10 }} />

        let iconData = this.getIconData()

        return (
            <Button
                transparent
                disabled={iconData.disabled}
                onPress={e => {
                    syncAppointments()
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
}
const mapStateToProps = state => ({
    others: othersSelector(state),
    appointments: appointmentsSelector(state),
})
const mapDispatchToProps = {
    //setOthers,
}

export default connect(mapStateToProps, mapDispatchToProps)(RightIcon)
