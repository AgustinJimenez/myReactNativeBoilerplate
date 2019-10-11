import React from 'react'
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
