import React from 'react'
import { Picker, ListItem, Left, Body, Text } from 'native-base'
import Select from '../../../components/utils/Select'
import { connect } from 'react-redux'
import { setHoursBeforeAppointmentNotification } from '../../../actions'
import { langSelector, othersSelector, hoursBeforeAppointmentNotificationSelector } from '../../../selectors/datasetsSelector'
import { withTranslation } from 'react-i18next'

class AppointmentNotificationInput extends React.Component {
    state = {
        range: [1, 2, 3, 4, 5, 6, 7, 8],
    }

    getSelectedValue = () => {
        return this.props.hours_before_appointment_notification
    }

    render() {
        return (
            <>
                <ListItem noBorder>
                    <Left>
                        <Text>{this.props.t('appointment_notification') + ':'}</Text>
                    </Left>
                </ListItem>
                <ListItem noBorder>
                    <Body>
                        <Select
                            iosHeader='select_hour'
                            placeholder={this.getSelectedValue() + this.props.t('hours_before')}
                            selectedValue={this.getSelectedValue()}
                            onValueChange={hours => {
                                this.props.setHoursBeforeAppointmentNotification(hours)
                            }}
                            items={this.state.range.map((hours, key) => ({
                                label: `${hours}  ${this.props.t('hours_before')}`,
                                value: hours,
                            }))}
                        />
                    </Body>
                </ListItem>
            </>
        )
    }
}
const mapStateToProps = state => ({
    hours_before_appointment_notification: hoursBeforeAppointmentNotificationSelector(state),
    others: othersSelector(state),
})
const mapDispatchToProps = {
    setHoursBeforeAppointmentNotification,
}
AppointmentNotificationInput = withTranslation()(AppointmentNotificationInput)
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppointmentNotificationInput)
