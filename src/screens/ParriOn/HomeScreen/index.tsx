import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import ParriOnContainer from '../../../components/ParriOnContainer'
import ImageActivaElAsado from '../../../assets/images/activa_el_asado.png'
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
            <Image source={ImageActivaElAsado} resizeMode='contain' style={{ width: scale(8), alignSelf: 'center' }}  />
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
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