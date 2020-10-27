import React from 'react'
import { ImageBackground, Image, StyleSheet } from 'react-native'
import ImageAtomsBg from '../../../assets/images/atoms_bg.png'
import ImageLogo from '../../../assets/images/logo.png'
import commonColor from '../../../theme/variables/commonColor.js'
import ParriOnContainer from '../../../components/ParriOnContainer'


const styles = StyleSheet.create({
    bgImage: { flex: 1, backgroundColor: commonColor.brandPrimary, alignItems: 'center', justifyContent: 'center' }
})

const AuthLoadingScreen = ({}) => {

    return (
        <ParriOnContainer>
            <ImageBackground 
                source={ImageAtomsBg} 
                style={styles.bgImage} 
                resizeMode='stretch'
            >
                <Image source={ImageLogo} />
            </ImageBackground>
        </ParriOnContainer>
    )
}
export default AuthLoadingScreen