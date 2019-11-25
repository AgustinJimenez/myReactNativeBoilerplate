import { StyleSheet } from 'react-native'
import CommonStyles, { colors } from '../../theme/variables/commonStyles'

export const brandPrimary = colors.brandPrimary

export default StyleSheet.create({
    labelPadder: {
        ...CommonStyles.padVertical5,
    },
})
