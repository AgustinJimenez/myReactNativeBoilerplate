import React from 'react'
import { Image } from 'react-native'
import { Container, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base'

import styles from './styles'
import sidebar_top_img from '../../assets/images/logo.png'

const SideBar = props => (
    <Container>
        <Content style={styles.content}>
            <Image source={sidebar_top_img} style={styles.sidebar_top_img} />
            <List
                primary
                dataArray={props.sidebar_routes}
                contentContainerStyle={{ marginTop: 120 }}
                renderRow={sidebar_route => {
                    return (
                        <ListItem button onPress={() => props.navigation.navigate(sidebar_route.route)}>
                            <Left>
                                <Text style={styles.text_color}>{sidebar_route.title}</Text>
                            </Left>

                            <Right>
                                <Icon active name={sidebar_route.icon} />
                            </Right>
                        </ListItem>
                    )
                }}
            />
        </Content>
    </Container>
)
export default SideBar
