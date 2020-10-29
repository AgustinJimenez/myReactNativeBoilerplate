import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import ParriOnContainer from '../../../components/ParriOnContainer'
import { logoutAction } from '../../../actions'
import { colors } from '../../../theme/variables/commonStyles'
import { scale } from '../../../theme/variables/commonStyles'

const HomeScreen = ({}) => {
    const dispatch = useDispatch()

    const logout = () => {
        dispatch( logoutAction() )
    }

    return (
        <ParriOnContainer>
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: scale(0.6) }}>HomeScreen</Text>
                <TouchableOpacity
                    onPress={() => logout()}
                    style={{
                        backgroundColor: colors.brandSecondary,
                        paddingHorizontal: scale(1.5),
                        paddingVertical: scale(0.2)
                    }}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </ParriOnContainer>
    )
}
export default HomeScreen