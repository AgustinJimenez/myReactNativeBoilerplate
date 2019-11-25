import BackgroundFetch from "react-native-background-fetch"
import { store } from '../app/store'
import { updateItemToDatasetList, syncAppointment, setOthers } from '../actions'
import Appointment from '../models/Appointment'
import { minutesToMiliseconds } from '../utils/commonParses'
import { othersSelector, appointmentsSelector } from '../selectors/datasetsSelector'
import { formatDate } from '../utils/dateFormat'

const SyncAppointmentsTask = async _ => {

    await store.dispatch(setOthers({ appointmentsAreSynchronizing: true }))

    console.log(`\n<=============================\nRUNNING-TASK - ${formatDate(new Date(), 'hh:mm:ss')}\n=============================>\n`)
    let state = store.getState()
    const appointments = appointmentsSelector(state).data
    let others = othersSelector(state).data
    var logs = others.logs || []
    //var syncAppointmentAction = appointment => dispatch(syncAppointment(appointment))

    appointments
        .filter(appointment => !appointment.sync)
        .map(
            appointment => {

                console.log('TASK: APPOINTMENT-TO-SYNC BEFORE ===> ', { appointment })
                //let updatedAppointment = store.dispatch(syncAppointment(appointment))
                //console.log('TASK: APPOINTMENT-TO-SYNC AFTER ===> ', { updatedAppointment })
                //this.props.updateAppointment(updatedAppointment)

            }
        )
    console.log('RUNNING-TASK HERE ====> ', { appointments, others, logs })
    logs.push(`RUNNING-TASK - ${formatDate(new Date(), 'hh:mm:ss')}`)
    //store.dispatch(setOthers({ logs }))
    setTimeout(async _ => {
        await store.dispatch(setOthers({ appointmentsAreSynchronizing: false }))
        BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA)
    }, 1000)

}

export default SyncAppointmentsTask