import { StyleSheet } from 'react-native'
import commonStyles from '../../../../theme/variables/commonStyles'
import Colors from '../../../../theme/variables/commonColor'
import Platform from '../../../../theme/variables/platform'

export default StyleSheet.create({
    successColor: {
        color: Colors.btnSuccessBg
    },
    emptyDate: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'white'
    },

    itemBackground: {
        color: 'white',
        marginRight: 5,
    },
    buttonsContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5,
        minHeight: Platform.deviceWidth * 0.12,
        marginTop: 5,
        //...commonStyles.elevationLow
    },
    itemTextContainer: { flex: 0.8, alignItems: 'flex-start' },
    itemIconContainer: { flex: 0.2 },
    button: {
        width: Platform.deviceWidth * 0.14,
        height: Platform.deviceWidth * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5,
        marginVertical: 5,
        //marginRight: -10,
        //...commonStyles.elevationLow
    },
    itemText: {
        marginTop: 5,
        textAlign: 'left',
        color: 'black',
    },
    itemTextGray: {
        color: 'gray',
    },
    buttonIcon: { color: 'white' },
    noData: {
        flex: 0.5,
        ...commonStyles.center,
    },
    ...commonStyles
})
