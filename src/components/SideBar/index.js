import React from 'react'
import { Image, Alert, ScrollView, SafeAreaView } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Body, List, ListItem, Text, Left, Right, Icon, View } from 'native-base'
import { withNavigation } from 'react-navigation'
import styles from './styles'
import sidebar_top_img from '../../assets/images/dls_logo.png'
import { connect } from 'react-redux'
import { logout } from '../../actions'
import { withTranslation } from 'react-i18next'
import { StackActions, NavigationActions } from 'react-navigation'
import { authSelector } from '../../selectors/datasetsSelector'
import capitalize from '../../utils/capitalize'

class SideBar extends React.Component {
    getSidebarRoutes = _ => [
        { title: this.props.t('home'), icon: 'home', route: 'Home' },
        { title: this.props.t('settings'), icon: 'settings', route: 'Settings' },
        {
            title: this.props.t('logout'),
            type: 'MaterialCommunityIcons',
            icon: 'exit-to-app',
            onPress: _ => {
                Alert.alert(this.props.t('warning'), this.props.t('sure_want_leave'), [
                    {
                        text: this.props.t('no'),
                    },
                    {
                        text: this.props.t('yes'),
                        onPress: async _ => {
                            await this.props.logout()
                            this.props.navigation.navigate('Login')
                        },
                    },
                ])
            },
        },
        //{ title: '1 - Simmple List', route: 'SimpleList' },
        //{ title: '2 - List Details', route: 'ListDetails' },
    ]

    render() {
        let routes = this.getSidebarRoutes()
        return (
            <SafeAreaView style={styles.content}>
                <CardItem bordered style={styles.logotop}>
                    <Image source={sidebar_top_img} style={styles.sidebar_top_img} />
                </CardItem>
                <CardItem bordered>
                    <Left>
                        <View style={styles.avatar}>
                            <Thumbnail source={{ uri: this.props.auth.data.avatar }} />
                        </View>
                        <Body>
                            <Text>{capitalize(this.props.auth.data.username)}</Text>
                            <Text note>{this.props.auth.data.branch_name}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <ScrollView>
                    <List primary style={styles.list}>
                        {routes.map((sidebar_route, key) => {
                            let iconProps = {
                                type: sidebar_route.type,
                                name: sidebar_route.icon,
                            }

                            return (
                                <ListItem
                                    key={key}
                                    last={routes.length === key + 1}
                                    button
                                    style={{ marginLeft: 0, paddingLeft: 20 }}
                                    onPress={_ => {
                                        if (!!sidebar_route.onPress) sidebar_route.onPress()
                                        else {
                                            let resetAction = StackActions.reset({
                                                index: 0,
                                                actions: [NavigationActions.navigate({ routeName: sidebar_route.route })],
                                            })
                                            this.props.navigation.dispatch(resetAction)
                                        }
                                    }}
                                >
                                    <Left>
                                        <Text style={styles.text_color}>{sidebar_route.title}</Text>
                                    </Left>

                                    <Right>
                                        <Icon active style={styles.red} {...iconProps} />
                                    </Right>
                                </ListItem>
                            )
                        })}
                    </List>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    auth: authSelector(state),
})
const mapDispatchToProps = {
    logout,
}

SideBar = withNavigation(SideBar)
SideBar = withTranslation()(SideBar)
export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
