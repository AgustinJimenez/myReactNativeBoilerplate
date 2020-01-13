import { StyleSheet } from 'react-native'
import CommonStyles, { colors } from '../../theme/variables/commonStyles'

export const brandPrimary = colors.brandPrimary

export default StyleSheet.create({
    map: { width: '100%', height: 300, borderRadius: 5 },
    openMapButton: {},
    closeIcon: { ...CommonStyles.closeIcon },
    colorPrimary: {
        color: brandPrimary,
    },
    openMapButtonIcon: { color: 'white' },
})
