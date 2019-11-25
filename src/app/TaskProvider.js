import { useEffect } from 'react'
import Tasks from '../tasks'
import BackgroundFetch from "react-native-background-fetch"
//import BackgroundTask from 'react-native-background-task'
//import showToast from '..//utils/showToast'

const BackgroundFetchConfig = {
    minimumFetchInterval: 15,     // <-- minutes (15 is minimum allowed)
    // Android options
    enableHeadless: true,
    stopOnTerminate: false,
    startOnBoot: true,
    forceReload: true,
    requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, // Default
    requiresCharging: false,      // Default
    requiresDeviceIdle: false,    // Default
    requiresBatteryNotLow: false, // Default
    requiresStorageNotLow: false  // Default
}

const BackgroundFetchOnError = error => console.log("[js] RNBackgroundFetch failed to start", error)

const runTasks = async _ => {
    Tasks.SyncAppointmentsTask()
    Tasks.NotificationPerAppointmentTask()
}
const onTaskProviderDidMount = _ => {

    BackgroundFetch.configure(BackgroundFetchConfig, runTasks, BackgroundFetchOnError)
    BackgroundFetch.registerHeadlessTask(runTasks)
    /* 
    BackgroundFetch.status((status) => {
        switch (status) {
            case BackgroundFetch.STATUS_RESTRICTED:
                //console.log("BackgroundFetch restricted");
                break;
            case BackgroundFetch.STATUS_DENIED:
                //console.log("BackgroundFetch denied");
                break;
            case BackgroundFetch.STATUS_AVAILABLE:
                //console.log("BackgroundFetch is enabled");
                break;
        }
    })
     */
}
const TaskProvider = _ => {

    useEffect(onTaskProviderDidMount, [])

    return null
}
export default TaskProvider