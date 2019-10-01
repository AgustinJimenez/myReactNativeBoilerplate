import React from 'react'
import { ExpoConfigView } from '@expo/samples'

import { Image, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native'

import { Card, CardItem, Body, Item, Label, Text, Input, Button } from 'native-base'

import MapView, { Marker, ProviderPropType } from 'react-native-maps'

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Cita',
        headerBackTitle: 'Atrás',
    }

    state = {
        step: 1,
        latLng: {
            latitude: -25.285,
            longitude: -57.5637,
        },
        latLng2: {
            latitude: -25.2905,
            longitude: -57.5533,
        },
    }

    render = () => {
        /* Go ahead and delete ExpoConfigView and replace it with your
         * content, we just wanted to give you a quick view of your config */
        return (
            <View
                style={{
                    ...styles.container,
                }}
            >
                <ScrollView
                    style={{
                        ...styles.container,
                    }}
                    contentContainerStyle={styles.contentContainer}
                >
                    <Card>
                        <CardItem>
                            <Body
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <MapView
                                    style={{ width: '100%', height: 400 }}
                                    initialRegion={{
                                        ...this.state.latLng,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                >
                                    <Marker coordinate={this.state.latLng} />
                                </MapView>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>{this.StepButtons()}</Card>
                </ScrollView>
            </View>
        )
    }

    StepButtons = () => {
        const { navigate } = this.props.navigation
        if (this.state.step == 1) {
            return (
                <CardItem>
                    <Body
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            onPress={() => {
                                alert('Se asigno el lugar de la cita')
                                this.setState(state => ({
                                    step: state.step + 1,
                                    latLng: state.latLng2,
                                }))
                            }}
                        >
                            <Text>Check In</Text>
                        </Button>
                    </Body>
                </CardItem>
            )
        }
        if (this.state.step == 2) {
            return (
                <CardItem>
                    <Body
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            onPress={() => {
                                alert('Cita para reagendar')
                                this.setState(state => ({ step: state.step + 1 }))
                            }}
                        >
                            <Text>Interesado</Text>
                        </Button>
                    </Body>

                    <Body
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            onPress={() => {
                                alert('Se finalizo la cita')
                                this.setState(state => ({ step: 10 }))
                            }}
                        >
                            <Text>Sin interes</Text>
                        </Button>
                    </Body>
                </CardItem>
            )
        }
        if (this.state.step == 3) {
            return (
                <CardItem>
                    <Body
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            onPress={() => {
                                alert('La cita a sido guardada')
                                navigate('Links')
                            }}
                        >
                            <Text>Agregar cita en el mismo lugar</Text>
                        </Button>
                    </Body>
                </CardItem>
            )
        }

        if (this.state.step == 10) {
            return (
                <CardItem>
                    <Body
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text>Cita terminada</Text>
                    </Body>
                </CardItem>
            )
        }
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
    contentContainer: {},
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 250,
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
