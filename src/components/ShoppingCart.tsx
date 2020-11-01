import React from 'react'
import { Image, View } from 'react-native'
import ImageShoppingCartUpper from '../assets/images/shoppingCartUpper.png'
import ImageShoppingCartWheel from '../assets/images/shoppingCartWheel.png'
import { scale } from '../theme/variables/commonStyles'

const ShoppingCart = ({ style = {} }) => {

    const width = !!style['width'] ? style['width'] :scale()

    return (
        <View style={[ { width }, style ]} >
            <Image source={ImageShoppingCartUpper} resizeMode='contain' style={{ width }} />
            <View style={{ flexDirection: 'row', marginTop: -scale(0.5), alignSelf: 'center' }}>
                {
                    [
                        null,
                        null
                    ].map((item, key) => (
                        <View style={{ flex: 1, alignItems: 'center' }} key={key}>
                            <Image source={ImageShoppingCartWheel} style={{ width: width/4 }} resizeMode='contain' />
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default ShoppingCart