
import React from 'react'
import { Toast } from 'native-base'
import ToastContent from './ToastContent'


const showToast = (text, options) => {

    let defaultOptions = {
        type: 'warning',
        position: 'bottom',
        duration: 6000,
        buttonText: 'OK'
    }
    let toastOptions = { ...defaultOptions, ...options }

    //console.log('SHOW-TOAST ===> ', { text, toastOptions })
    Toast.show({
        text: <ToastContent text={text} />,
        ...toastOptions
    })
}
export default showToast
