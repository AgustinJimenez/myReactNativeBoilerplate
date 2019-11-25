import { Platform, StyleSheet } from 'react-native'
import commonColor from './commonColor'

export const colors = commonColor
export default StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorPrimary: {
        color: commonColor.btnPrimaryBg, // brandPrimary
    },
    elevationLow: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 0.1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                //backgroundColor: 'red',
            },
            android: {
                elevation: 5,
            },
        }),
    },
    padVertical5: {
        paddingVertical: 5,
    },
    bgDanger: {
        backgroundColor: commonColor.btnDangerBg,
    },
    bgPrimary: {
        backgroundColor: commonColor.btnPrimaryBg,
    },
    bgWarning: {
        backgroundColor: commonColor.btnWarningBg,
    },
    //Helpers
    m0: {
        margin: 0,
    },
    p0: {
        padding: 0,
    },
})
