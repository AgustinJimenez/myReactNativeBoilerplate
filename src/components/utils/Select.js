import React from 'react'
import { Platform } from 'react-native'
import { Icon, Picker, View, Item } from 'native-base'
import { useTranslation } from 'react-i18next'

const Select = ({ placeholder, style, iosHeader, selectedValue, onValueChange, items = [], isLoading = false }) => {
    let { t } = useTranslation()
    let defaultStyle = {}
    let component = null
    if (Platform.OS === 'ios') defaultStyle = { ...defaultStyle, backgroundColor: 'white' }
    else if (Platform.OS === 'android') items.unshift({ label: placeholder, value: null })

    component = (
        <Picker
            placeholder={t(placeholder)}
            style={[defaultStyle, style]}
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
        >
            {items.map((item, key) => (
                <Picker.Item key={key} label={t(item.label)} value={item.value} />
            ))}
        </Picker>
    )

    if (Platform.OS === 'android') component = <Item picker children={component} />

    return component
}

export default Select
