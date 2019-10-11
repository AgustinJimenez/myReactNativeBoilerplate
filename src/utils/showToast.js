import { Toast } from 'native-base'
const showToast = (text, options) => {
    //console.log('showToast ===> ', { text, options })
    let defaultOptions = {
        buttonText: 'OK',
        type: 'none' || 'warning' || 'danger' || 'success',
        duration: 3000,
        position: 'top' || 'bottom',
        textStyle: {},
        buttonTextStyle: {},
    }

    Toast.show({ ...defaultOptions, ...options, text })
}
export default showToast
