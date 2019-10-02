import React from 'react'
import { Image, Platform, ScrollView, StyleSheet, View, ImageBackground } from 'react-native'
import { WebBrowser } from 'expo'

import { Card, CardItem, Body, Text, Item, Label, Input, Button } from 'native-base'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
        headerBackTitle: 'Atrás',
    }

    render() {
        const { navigate } = this.props.navigation

        return (
            <ImageBackground
                resizeMode="cover"
                source={require('../assets/images/login.jpg')}
                style={{
                    ...styles.container,
                }}
            >
                <ScrollView
                    style={{
                        ...styles.container,
                        backgroundColor: 'rgba(0,0,0,0.65)',
                    }}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View
                        style={{
                            margin: 40,
                            flex: 1,
                            shadowOffset: { width: 5, height: 5 },
                            shadowColor: 'black',
                            shadowOpacity: 1.0,
                            elevation: 5,
                            borderRadius: 15,
                        }}
                    >
                        <Card>
                            <CardItem>
                                <Body
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Image source={require('../assets/images/dls_logo.png')} style={styles.welcomeImage} />
                                    <Text>Sistema CRM</Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Body
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Item inlineLabel>
                                        <Label>Usuario*</Label>
                                        <Input />
                                    </Item>

                                    <Item inlineLabel>
                                        <Label>Contraseña*</Label>
                                        <Input secureTextEntry={true} />
                                    </Item>

                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginVertical: 20,
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Button onPress={() => navigate('Links')}>
                                            <Text>Ingresar</Text>
                                        </Button>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode')
    }

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: '100%',
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
})