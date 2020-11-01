import React from 'react'
import { Text, FlatList, View, Image, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import ParriOnContainer from '../../../components/ParriOnContainer'
import ImageActivaElAsado from '../../../assets/images/activa_el_asado.png'
import { logoutAction } from '../../../actions'
import { colors } from '../../../theme/variables/commonStyles'
import { scale } from '../../../theme/variables/commonStyles'
import AvatarImage from '../../../assets/images/avatar_image.png'
import ShoppingCart from '../../../components/ShoppingCart'
import ImageFlame from '../../../assets/images/flame.png'
import { useTranslation } from 'react-i18next'
import capitalize from '../../../utils/capitalize'
import BottomNav from '../../../components/BottomNav'
import ProductCard from '../../../components/ProductCard'

const styles = StyleSheet.create({
    listTitle: { color: 'white', fontSize: scale(0.75), fontWeight: '700' }
})

const HomeScreen = ({}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch( logoutAction() )
    }

    const products = [
        {
            id: 0,
            title: 'Costilla de Cerdo',
            subtitle: 'Ideal para la parrilla a fuego lento',
            price: 28000,
            image: require('../../../assets/images/product1.png')
        },
        {
            id: 1,
            title: 'Tbone especial',
            subtitle: 'Ideal para la parrilla a fuego lento',
            price: 33000,
            image: require('../../../assets/images/product2.png')

        },
        {
            id: 2,
            title: 'Costilla de Cerdo',
            subtitle: 'Ideal para la parrilla a fuego lento',
            price: 28000,
            image: require('../../../assets/images/product3.png')
        },
        {
            id: 3,
            title: 'Costilla de Cerdo',
            subtitle: 'Ideal para la parrilla a fuego lento',
            price: 28000,
            image: require('../../../assets/images/product4.png')
        },
    ]

    return (
        <ParriOnContainer>
            <Image source={ImageFlame} resizeMode='contain' style={{ width: scale(3), height: scale(3), alignSelf: 'center', position: 'absolute', top: scale(2) }}  />
            <Image source={AvatarImage} style={{ position: 'absolute', left: scale(0.3), width: scale(1) }} resizeMode='contain' />
            <ShoppingCart style={{ position: 'absolute', right: scale(0.3), top: scale(0.7), width: scale(0.8) }} />
            <Image source={ImageActivaElAsado} resizeMode='contain' style={{ width: scale(8), height: scale(2.5), alignSelf: 'center', marginTop: scale(2.1), }}  />
            <View style={{ paddingHorizontal: scale(0.3) }} >
                <Text style={styles.listTitle} >{capitalize(t('for_the_ideal_barbecue'), {firstOnly: true})}</Text>
                <FlatList
                    data={products}
                    renderItem={ ({item: {id, title, subtitle, price, image}, key, separators}, ) => (
                        <ProductCard 
                            id={id} 
                            key={key} 
                            title={title} 
                            subtitle={subtitle} 
                            price={price} 
                            image={image} 
                            onPress={() => {
                                console.log(`PRESSED -> ${id} - ${title}`)
                            }}
                        />
                    )}
                    horizontal
                />
                <Text style={[styles.listTitle, { marginTop: scale(0.6) }]} >{capitalize(t('so_that_nothing_is_missing'), {firstOnly: true})}</Text>
                <FlatList
                    data={products}
                    renderItem={ ({item: {id, title, subtitle, price, image}, key, separators}, ) => (
                        <ProductCard 
                            id={id} 
                            key={key} 
                            title={title} 
                            subtitle={subtitle} 
                            price={price} 
                            image={image} 
                            onPress={() => {
                                console.log(`PRESSED -> ${id} - ${title}`)
                            }}
                        />
                    )}
                    horizontal
                />
            </View>
            <BottomNav/>
        </ParriOnContainer>
    )
}
export default HomeScreen