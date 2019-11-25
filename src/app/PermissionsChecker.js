import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import { Platform } from 'react-native'

const androidPermissions = [PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]
const iosPermissions = [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]

const getAndroidPermissions = _ => {
    if (Platform.OS === 'android') return androidPermissions
    return []
}
const getIosPermissions = _ => {
    if (Platform.OS === 'ios') return iosPermissions
    return []
}
const getAllPermissions = _ => getAndroidPermissions().concat(getIosPermissions())

const PermissionsChecker = () => {
    var permissionStatus

    getAllPermissions().map(async p => {
        permissionStatus = await check(p)
        switch (permissionStatus) {
            case RESULTS.UNAVAILABLE:
                //console.log('This feature is not available (on this device / in this context)')
                break
            case RESULTS.DENIED:
                requestPermissionStatus = await request(p)
                break
            case RESULTS.GRANTED:
                //console.log('The permission is granted');
                break
            case RESULTS.BLOCKED:
                //console.log('The permission is denied and not requestable anymore');
                break
        }
    })
    return null
}

export default PermissionsChecker
