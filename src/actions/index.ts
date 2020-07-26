import {
    AUTH_SAGAS,
    FETCH_CLIENTS_SAGAS,
    UPDATE_NETWORK_STATUS_SAGAS,
    SET_ON_DATASET_REDUCER,
    PUSH_TO_DATASET_LIST_REDUCER,
    UPDATE_TO_DATASET_LIST_REDUCER,
    DELETE_DATASET_LIST_REDUCER,
    SYNC_APPOINTMENTS_SAGAS,
    FETCH_REASONS_SAGAS,
    CHANGE_LANGUAGE_SAGAS,
    FETCH_APPOINTMENTS_SAGAS,
    CHECK_IN_APPOINTMENT_SAGAS,
    CREATE_APPOINTMENT_SAGA,
    UPDATE_APPOINTMENT_SAGA,
    SYNC_APPOINTMENT_SAGA,
    FETCH_APPOINTMENT_STRUCTURE_SAGA,
    FETCH_CLIENTS_REDUCER,
    FETCH_REASONS_REDUCER,
    CHECK_NETWORK_SAGA,
    RUN_TASKS_SAGA,
    SYNC_APPOINTMENTS_NOTIFICATIONS_SAGA,
    CLEAR_REASONS_REDUCER,
    CLEAR_CLIENTS_REDUCER,
    LOGOUT_SAGA,
    SET_NOTIFICTION_REDUCER,
    CLEAR_NOTIFICTIONS_REDUCER,
    SET_NOTIFICTION_SAGA,
    NOTIFICATION_WAS_TAPPED_SAGA,
    LOG_SAGA,
} from './types'
import Appointment from '../models/Appointment'

export const actionAuthSaga = (params: any, onFinishCallback: Function) => ({
    type: AUTH_SAGAS,
    onFinishCallback,
    ...params,
})
export const fetchClientsAction = ({ onFinishCallback, clientsIds, searchName }: any) => ({
    type: FETCH_CLIENTS_SAGAS,
    onFinishCallback,
    clientsIds,
    searchName,
})
export const setClientsReducerAction = (data: any) => ({
    type: FETCH_CLIENTS_REDUCER,
    data,
})
export const fetchAppointmentsAction = (onFinishCallback: Function) => ({
    type: FETCH_APPOINTMENTS_SAGAS,
    onFinishCallback,
})
export const setAppointmentsDatasetAction = (data: any) => ({
    type: SET_ON_DATASET_REDUCER,
    dataset_name: 'appointments',
    data,
})
export const clearReasonsReducerAction = () => ({
    type: CLEAR_REASONS_REDUCER,
})
export const clearClientsReducerAction = () => ({
    type: CLEAR_CLIENTS_REDUCER,
})
export const fetchAppointmentStructureAction = () => ({
    type: FETCH_APPOINTMENT_STRUCTURE_SAGA,
})
export const setAppointmentStructureDatasetAction = (data: Object) => ({
    type: SET_ON_DATASET_REDUCER,
    dataset_name: 'appointment_structure',
    data,
})
export const fetchReasonsAction = ({ onFinishCallback, searchName, ids }: any) => ({
    type: FETCH_REASONS_SAGAS,
    onFinishCallback,
    searchName,
    ids,
})
export const setReasonsReducerAction = (data: any) => ({
    type: FETCH_REASONS_REDUCER,
    data,
})
export const updatNetworkStatusAction = (network: any) => ({
    type: UPDATE_NETWORK_STATUS_SAGAS,
    network,
})
export const checkNetworkStatusAction = () => ({
    type: CHECK_NETWORK_SAGA,
})
export const setNetworkStatusAction = (network: any) => ({
    type: SET_ON_DATASET_REDUCER,
    dataset_name: 'network',
    data: network,
})
export const syncAppointmentAction = (appointment: Appointment) => ({
    type: SYNC_APPOINTMENT_SAGA,
    appointment,
})
export const syncAppointmentsAction = (onFinishCallback?: Function) => ({
    type: SYNC_APPOINTMENTS_SAGAS,
    onFinishCallback,
})
export const checkInAppointmentAction = (onFinishCallback: Function) => ({
    type: CHECK_IN_APPOINTMENT_SAGAS,
    onFinishCallback,
})
export const setAuthDatasetAction = (data: any) => ({
    type: SET_ON_DATASET_REDUCER,
    dataset_name: 'auth',
    data,
})
export const logoutAction = () => ({
    type: LOGOUT_SAGA,
})
export const clearAuthAction = () => ({
    type: SET_ON_DATASET_REDUCER,
    dataset_name: 'auth',
    data: { token: null },
})
export const setLangReducer = (lang_id: string) => ({
    type: SET_ON_DATASET_REDUCER,
    dataset_name: 'lang',
    data: lang_id,
})
export const setLangSaga = (lang_id: string) => ({
    type: CHANGE_LANGUAGE_SAGAS,
    lang_id,
})
export const setHoursBeforeAppointmentNotification = (hours: any) => ({
    type: SET_ON_DATASET_REDUCER,
    dataset_name: 'hours_before_appointment_notification',
    data: hours,
})
export const setOthersDatasetAction = (data: any) => ({
    type: SET_ON_DATASET_REDUCER,
    dataset_name: 'others',
    data,
})
export const createAppointment = (appointment: any, afterFinishCallback: Function) => ({
    type: CREATE_APPOINTMENT_SAGA,
    appointment,
    afterFinishCallback,
})
export const updateAppointmentAction = (appointment: any, afterFinishCallback?: Function) => ({
    type: UPDATE_APPOINTMENT_SAGA,
    appointment,
    afterFinishCallback,
})
export const pushNewItemToDatasetListAction = (data: any, dataset_name: string) => ({
    type: PUSH_TO_DATASET_LIST_REDUCER,
    dataset_name,
    data,
})
export const updateItemToDatasetList = (data: any, dataset_name: string, afterFinishCallback?: Function) => ({
    type: UPDATE_TO_DATASET_LIST_REDUCER,
    dataset_name,
    data,
    afterFinishCallback,
})
export const deleteItemFromDatasetList = (data: any, dataset_name: string, afterFinishCallback: Function) => ({
    type: DELETE_DATASET_LIST_REDUCER,
    dataset_name,
    data,
    afterFinishCallback,
})
export const runTasksSaga = ({ afterFinishCallback }: any) => ({
    type: RUN_TASKS_SAGA,
    afterFinishCallback,
})
export const syncAppointmentsNotificationsSagaAction = () => ({
    type: SYNC_APPOINTMENTS_NOTIFICATIONS_SAGA,
})
export const setNotificationSagaAction = (data: any, afterFinishCallback?: Function) => ({
    type: SET_NOTIFICTION_SAGA,
    data,
    afterFinishCallback,
})
export const notificationWasTappedAction = (data: any, afterFinishCallback?: Function) => ({
    type: NOTIFICATION_WAS_TAPPED_SAGA,
    data,
    afterFinishCallback,
})
export const setNotificationReducerAction = (data: any) => ({
    type: SET_NOTIFICTION_REDUCER,
    data,
})
export const clearNotificationsReducerAction = () => ({
    type: CLEAR_NOTIFICTIONS_REDUCER,
})
export const logAction = (data: string) => ({
    type: LOG_SAGA,
    data,
})
