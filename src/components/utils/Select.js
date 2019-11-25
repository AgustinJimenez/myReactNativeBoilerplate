import React from 'react'
import { Icon, Picker, View } from 'native-base'
import { useTranslation } from 'react-i18next'

export default ({ placeholder, style, iosHeader, selectedValue, onValueChange, children }) => {
    let { t } = useTranslation()
    return (
        <Picker
            placeholder={t(placeholder)}
            style={style}
            mode='dropdown'
            iosHeader={t(iosHeader)}
            iosIcon={
                <View style={{ flex: 1 }}>
                    <Icon style={{ alignSelf: 'flex-end', paddingRight: 10 }} name='arrow-down' />
                </View>
            }
            selectedValue={selectedValue}
            headerBackButtonText={t('back')}
            onValueChange={onValueChange}
            children={children}
        />
    )
}