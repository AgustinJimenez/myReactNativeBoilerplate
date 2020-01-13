import { StyleSheet } from 'react-native'
import CommonStyles, { colors } from '../../theme/variables/commonStyles'

export const brandPrimary = colors.brandPrimary

export default StyleSheet.create({
    labelPadder: {
        ...CommonStyles.padVertical5,
    },
    closeIcon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        fontSize: 30,
        overflow: 'hidden',
        paddingLeft: 15,
        paddingBottom: 15,
    },
    colorPrimary: {
        color: brandPrimary,
    },
    exitIcon: {
        color: colors.cardDefaultBg,
        textAlignVertical: 'center',
    },
})
