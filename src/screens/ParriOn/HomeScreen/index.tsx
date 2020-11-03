import React from 'react'
import { Text, FlatList, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
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
import BottomSheet from 'reanimated-bottom-sheet'
import { datasetSelector } from '../../../redux/selectors'
import { setDatasetToReducer } from '../../../redux/actions'

const styles = StyleSheet.create({
    listTitle: { color: 'white', fontSize: scale(0.75), fontWeight: '700' }
})

const HomeScreen = ({}) => {
    const sheetRef:any = React.useRef(null)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const logout = () => dispatch( logoutAction() )
    const selectProduct = (id: number) => dispatch( setDatasetToReducer(id, 'selected_product_id') )

    const products = useSelector(state => datasetSelector(state, 'products', {list_format: true}))
    const selected_product_id = useSelector(state => datasetSelector(state, 'selected_product_id'))
    const selected_product: any = useSelector(state => datasetSelector(state, 'products', { id: selected_product_id }))
    console.log('HERE ===> ', {selected_product_id, selected_product})

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
                    renderItem={ ({item: {id, title, subtitle, price, image}, index}: any) => {
                    return (
                        <ProductCard 
                            id={id} 
                            key={index} 
                            title={title} 
                            subtitle={subtitle} 
                            price={price} 
                            image={image} 
                            onPress={() => {
                                
                                selectProduct(id)
                                sheetRef.current.snapTo(0)
                            }}
                        />
                    )}}
                    horizontal
                />
                <Text style={[styles.listTitle, { marginTop: scale(0.6) }]} >{capitalize(t('so_that_nothing_is_missing'), {firstOnly: true})}</Text>
                <FlatList
                    data={products}
                    renderItem={ ({item: {id, title, subtitle, price, image}, key, separators}: any ) => (
                        <ProductCard 
                            id={id} 
                            key={key} 
                            title={title} 
                            subtitle={subtitle} 
                            price={price} 
                            image={image} 
                            onPress={() => {
                                selectProduct(id)
                                sheetRef.current.snapTo(0)
                            }}
                        />
                    )}
                    horizontal
                />
            </View>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[scale(10), 0, 0]}
                borderRadius={scale(0.6)}
                initialSnap={2}
                renderContent={() => !!selected_product && (
                    <View
                      style={{
                        backgroundColor: 'rgba(249,178,51,1)',
                        paddingTop: scale(0.4),
                        alignItems: 'center',
                        marginTop: scale(2)
                      }}
                    >
                    
                    <TouchableOpacity
                        onPress={() => {sheetRef.current.snapTo(2)}} 
                        style={{ width: '91%', borderRadius: scale(0.4), backgroundColor: 'red', overflow: 'hidden' }}
                    >
                        <Image 
                            source={{uri: selected_product?.image }} 
                            style={{ height: scale(6), width: '100%' }}
                            resizeMode='stretch'
                        />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '700', fontSize: scale(0.7) }}>{selected_product?.title}</Text>
                    <Text style={{ fontWeight: '700', fontSize: scale(0.4) }}>{capitalize( t('available_cuts'), {firstOnly: true})}</Text>

                    </View>
                  )}
            />
            <BottomNav/>
        </ParriOnContainer>
    )
}
export default HomeScreen