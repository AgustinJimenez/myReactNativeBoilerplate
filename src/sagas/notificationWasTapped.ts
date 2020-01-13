import { takeLatest, select } from 'redux-saga/effects'
import { NOTIFICATION_WAS_TAPPED_SAGA } from '../actions/types'
//import showToast from '../utils/showToast'
import { appointmentSelector } from '../selectors/datasetsSelector'
import { StackActions, NavigationActions } from 'react-navigation'
import NavigationService from '../app/NavigationProvider/service'
import { Platform } from 'react-native'

function* notificationWasTapped({ data, afterFinishCallback }: any) {
    console.log('notificationWasTapped ===> ', { data })
    if (Platform.OS === 'ios') data.userInfo = data.data

    if (!!data.userInfo && !!data.userInfo.header && !!data.userInfo.header.branch_out_id) {
        var appointment = yield select(state => appointmentSelector(state, data.userInfo))
        if (!!appointment) {
            let goToCheckInAction = StackActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' }),
                    NavigationActions.navigate({ routeName: 'AppointmentSteps', params: { appointment } }),
                ],
            })
            yield NavigationService.dispatch(goToCheckInAction)
        }
    }
    if (!!afterFinishCallback) afterFinishCallback()
}

export default function* appointmentNotificationWasTappedSaga() {
    yield takeLatest(NOTIFICATION_WAS_TAPPED_SAGA, notificationWasTapped)
}
