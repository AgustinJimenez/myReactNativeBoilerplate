import React from 'react'
import { Text } from 'native-base'
import { withTranslation } from 'react-i18next'

let ToastContent = props => {

    if (!!props.text)
        return <Text style={{ color: 'white' }} >{props.t(props.text)}</Text>
}
ToastContent = withTranslation()(ToastContent)

export default ToastContent