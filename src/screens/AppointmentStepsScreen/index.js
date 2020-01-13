import React from 'react'
import { Content, List, Container, Card, CardItem, Body, Button, Text } from 'native-base'
import { connect } from 'react-redux'
import { appointmentSelector, appointmentStructureSelector } from '../../selectors/datasetsSelector'
import HeaderTitle from '../../components/HeaderTitle'
import { withNavigation } from 'react-navigation'
import AppointmentInfo from './components/AppointmentInfo'
import MapInput from './components/MapInput'
import TextArea from './components/TextArea'
import SelectWrap from './components/SelectWrap'
import { useTranslation } from 'react-i18next'
import { NavigationContext } from 'react-navigation'
import { updateAppointmentAction, syncAppointmentAction, syncAppointmentsNotificationsSagaAction, fetchAppointmentStructureAction } from '../../actions'
//import JSONTree from 'react-native-json-tree'
import { useDispatch } from 'react-redux'

const GoBackButton = ({ appointment }) => {
    let dispatch = useDispatch()
    var navigation = React.useContext(NavigationContext)
    let { t } = useTranslation()
    return (
        <Card>
            <CardItem>
                <Body>
                    <Button
                        block
                        onPress={() => {
                            navigation.goBack()
                            dispatch(syncAppointmentAction(appointment))
                        }}
                    >
                        <Text>{t('back')}</Text>
                    </Button>
                </Body>
            </CardItem>
        </Card>
    )
}

const NextButton = ({ appointment, onPress }) => {
    var isDisabled = !canSubmitCurrentStepValues(appointment)
    let { t } = useTranslation()
    return (
        <Card>
            <CardItem>
                <Body>
                    <Button disabled={isDisabled} block onPress={onPress}>
                        <Text>{t('next')}</Text>
                    </Button>
                </Body>
            </CardItem>
        </Card>
    )
}

const canSubmitCurrentStepValues = appointment => {
    var canSubmit = true
    appointment['step_informations'][appointment['current_step']].some(({ type, name, label, value }) => {
        if (!value) {
            canSubmit = false
            return true
        }
    })
    return canSubmit
}
class AppointmentStepsScreen extends React.Component {
    static navigationOptions = props => {
        return {
            headerTitle: <HeaderTitle trans_id='appointment' />,
        }
    }
    stepFieldsTypes = {
        textarea: TextArea,
        location: MapInput,
        selection: SelectWrap,
        none: GoBackButton,
    }
    renderSteps = () => {
        var appointment = this.props.appointment
        //console.log('renderSteps ===> ', { appointment })
        if (!appointment.current_step) return <GoBackButton appointment={appointment} />

        return this.props.appointmentStructure.sequence.map((stepId, sequenceKey) => {
            let fields = []
            if (appointment.current_step !== stepId) return fields

            var onSubmit = () => {
                if (canSubmitCurrentStepValues(appointment)) {
                    appointment['current_step'] = this.props.appointmentStructure.sequence[sequenceKey + 1] || null
                    appointment['sync'] = false
                    this.props.updateAppointmentAction(appointment.getDatas(), () => {
                        //this.props.appointment
                        //this.props.syncAppointmentAction(appointment)
                    })
                }
            }

            fields = appointment['step_informations'][stepId].map(({ type, name, label, value }, stepInfoKey) => {
                //console.log('HERE ===> ', { appointment: appointment.getDatas(), stepId, type, name, label, value })
                let Field = this.stepFieldsTypes[type]
                return (
                    <Field
                        onSubmit={onSubmit}
                        key={`${sequenceKey}-${stepInfoKey}`}
                        value={value}
                        options={[]}
                        destination={appointment.ubication}
                        label_id={label}
                        placeholder_id={name}
                        onChangeValue={newValue => {
                            if (!appointment['step_informations'][stepId]) appointment['step_informations'][stepId] = []
                            appointment['step_informations'][stepId][stepInfoKey]['value'] = newValue
                            this.props.updateAppointmentAction({ ...appointment.getDatas(), sync: false })
                        }}
                    />
                )
            })
            fields.push(<NextButton key={sequenceKey} appointment={appointment} onPress={onSubmit} />)
            return fields
        })
    }
    componentDidMount() {
        this.props.fetchAppointmentStructureAction()
    }
    render = () => (
        <Container>
            <Content padder>
                <List style={{ marginBottom: 100 }}>
                    <AppointmentInfo appointment={this.props.appointment} />
                    {this.renderSteps()}
                    {/* <JSONTree data={this.props.appointment.getDatas()} /> */}
                </List>
            </Content>
        </Container>
    )
}
const mapStateToProps = (state, props) => ({
    appointment: appointmentSelector(state, props.navigation.getParam('appointment')),
    appointmentStructure: appointmentStructureSelector(state),
})
const mapDispatchToProps = {
    updateAppointmentAction,
    syncAppointmentAction,
    fetchAppointmentStructureAction,
}
AppointmentStepsScreen = withNavigation(AppointmentStepsScreen)
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentStepsScreen)
