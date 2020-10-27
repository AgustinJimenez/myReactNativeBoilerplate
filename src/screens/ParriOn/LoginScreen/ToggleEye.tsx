import React from 'react'
import { Image } from 'react-native'
import {Icon}from 'native-base'
import {scale, colors} from '../../../theme/variables/commonStyles'
import ImageEyeHide from '../../../assets/images/eye_hide.png'

const ToggleEye = ({ show = false }) => {

    if(show)
        return (
            <Image 
                source={ImageEyeHide} 
                style={{ width: scale(0.7), height: scale(0.7), marginHorizontal: scale(0.4) }}  
                resizeMode='contain'  
            />
        )

    return (

        <Icon 
            type='AntDesign' 
            name='eyeo'
            style={{ 
                fontSize: scale(0.8),
                marginHorizontal: scale(0.15),
                alignSelf: 'center',
                color: colors.brandSecondary, 
            }}   
        />

    )
}

export default ToggleEye