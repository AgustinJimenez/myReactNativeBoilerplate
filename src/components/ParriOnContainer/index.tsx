import React from 'react'
import { Container } from 'native-base'
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native'
import ImageAtomsBg from '../../assets/images/atoms_bg.png'
import commonColor from '../../theme/variables/commonColor.js'


const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        backgroundColor: commonColor.brandPrimary, 
        //alignItems: 'center', 
        //justifyContent: 'center',
    }
})

const ParriOnContainer = ({ children }) => (

        <ImageBackground
            source={ImageAtomsBg}
            style={styles.bgImage}
            resizeMode='stretch'
        >
            <SafeAreaView style={{ /* backgroundColor: 'blue',  */flex: 1 }}>
                {children}
            </SafeAreaView>
        </ImageBackground>

)
export default ParriOnContainer