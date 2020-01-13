import BackgroundFetch from 'react-native-background-fetch'

export default {
    minimumFetchInterval: 15,
    enableHeadless: true,
    stopOnTerminate: false,
    startOnBoot: true,
    forceReload: true,
    requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
    requiresCharging: false,
    requiresDeviceIdle: false,
    requiresBatteryNotLow: false,
    requiresStorageNotLow: false,
}
