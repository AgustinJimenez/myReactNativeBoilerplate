import React from 'react'
import { View, Text } from 'native-base'
import commonStyles from '../theme/variables/commonStyles'
import { useTranslation } from 'react-i18next'

let styles = {
    noData: {
        flex: 0.5,
        ...commonStyles.center,
    },
}

export default props => {
    let { t } = useTranslation()
    return (
        <View style={styles.noData}>
            <Text>{t('no_data')}</Text>
        </View>
    )
}