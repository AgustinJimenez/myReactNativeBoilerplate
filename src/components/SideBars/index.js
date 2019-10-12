import React from 'react'
import { Image, Alert } from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base'
import { withNavigation } from 'react-navigation'
import styles from './styles'
import sidebar_top_img from '../../assets/images/dls_logo.png'
import { connect } from 'react-redux'
import { logout } from '../../actions'

class SideBar extends React.Component {
    state = {
        routes: [
            { title: 'Home', icon: 'home', route: 'Home' },
            { title: 'Settings', icon: 'settings', route: 'Settings' },
            {
                title: 'Logout',
                type: 'MaterialCommunityIcons',
                icon: 'exit-to-app',
                onPress: _ => {
                    Alert.alert('AVISO', 'Esta seguro de que desea salir?', [
                        {
                            text: 'NO',
                        },
                        { text: 'SI', onPress: this.props.logout },
                    ])
                },
            },
            //{ title: '1 - Simmple List', route: 'SimpleList' },
            //{ title: '2 - List Details', route: 'ListDetails' },
        ],
    }
    getSidebarRoutes = _ => this.state.routes || []

    render() {
        var sidebar_routes = this.getSidebarRoutes()

        return (
            <Container style={styles.content}>
                <Header>
                    <Image source={sidebar_top_img} style={styles.sidebar_top_img} />
                </Header>
                <Content>
                    <List
                        primary
                        dataArray={sidebar_routes}
                        style={styles.list}
                        renderRow={(sidebar_route, key) => {
                            let iconProps = {
                                type: sidebar_route.type,
                                name: sidebar_route.icon,
                            }

                            return (
                                <ListItem
                                    last={sidebar_routes.length - 1 === key}
                                    button
                                    onPress={_ => {
                                        if (!!sidebar_route.onPress) sidebar_route.onPress()
                                        else this.props.navigation.navigate(sidebar_route.route)
                                    }}
                                >
                                    <Left>
                                        <Text style={styles.text_color}>{sidebar_route.title}</Text>
                                    </Left>

                                    <Right>
                                        <Icon active style={styles.listItemIcon} {...iconProps} />
                                    </Right>
                                </ListItem>
                            )
                        }}
                    />
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    //userSelector: usersSelector(state),
})
const mapDispatchToProps = {
    logout,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withNavigation(SideBar))
