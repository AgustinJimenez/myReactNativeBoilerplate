import React from 'react'
import { ImageBackground, Image, StyleSheet, View, Text } from 'react-native'
import ImageAtomsBg from '../../../assets/images/atoms_bg.png'
import ImageLogo from '../../../assets/images/logo.png'
import commonColor from '../../../theme/variables/commonColor.js'
import ParriOnContainer from '../../../components/ParriOnContainer'
import { scale } from '../../../theme/variables/commonStyles'


const styles = StyleSheet.create({
    bgImage: { flex: 1, backgroundColor: commonColor.brandPrimary, alignItems: 'center', justifyContent: 'center' }
})

const AuthLoadingScreen = ({}) => {

    return (
        <ParriOnContainer>
            <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                <Image source={ImageLogo} style={{ width: scale(3.7), height: scale(7.1), alignSelf: 'center' }} />
            </View>
        </ParriOnContainer>
    )
}
export default AuthLoadingScreen