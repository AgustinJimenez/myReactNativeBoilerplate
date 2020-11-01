import React from 'react'
import { View, Image, TouchableOpacity,Text } from 'react-native'
import { scale } from '../../theme/variables/commonStyles'

const ProductCard = ({ id = 0, title = '', subtitle = '', price = 0, image = '', onPress = (() => {}) }) => {

    //console.log(title +' - '+id)

    return (
        <TouchableOpacity
            onPress={ () => onPress()}
            style={{
                backgroundColor: 'white',
                width: scale(4),
                height: scale(5),
                borderRadius: scale(0.4),
                overflow: 'hidden',
                marginRight: scale(0.3)
            }}
        >
            <Image source={image} resizeMode='contain' style={{ width: '100%', height: '50%' }} />
            <Text style={{ textAlign: 'center', fontWeight: '900' }} >{title}</Text>
            <Text style={{ textAlign: 'center', color: 'gray', paddingBottom: scale(0.1) }} >{subtitle}</Text>
            <Text style={{ textAlign: 'center', color: 'white', backgroundColor: 'rgba(195,80,46,1)', fontWeight: '900' }} >{price} el Kg</Text>
            <View style={{ backgroundColor: 'rgba(249,178,51,1)', flex: 1, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'black' }} >Agregar al carrito</Text>
            </View>

        </TouchableOpacity>
    )
}

export default ProductCard