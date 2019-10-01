import React from 'react'
import { ExpoConfigView } from '@expo/samples'

import { Platform, ScrollView, StyleSheet, View } from 'react-native'

import { Card, CardItem, Body, Item, Text, Input, Button } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'

import MapView, { Marker, ProviderPropType } from 'react-native-maps'

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Formulario',
        headerBackTitle: 'Atrás',
    }

    state = {
        isDateTimePickerVisible: false,
        date: new Date(),
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true })
    }

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false })
    }

    handleDatePicked = date => {
        this.setState({ date })
        this.hideDateTimePicker()
    }

    render = () => {
        const { navigate } = this.props.navigation
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
                                <Item>
                                    <Input placeholder="Cliente" autoFocus />
                                </Item>
                                <Item last>
                                    <Input placeholder="Motivo" />
                                </Item>

                                <CardItem>
                                    <Button onPress={this.showDateTimePicker} bordered info>
                                        <Text>{`${this.state.date.toLocaleDateString()} ${this.state.date.toLocaleTimeString()}`}</Text>
                                    </Button>
                                </CardItem>

                                <DateTimePicker
                                    hideTitleContainerIOS
                                    confirmTextIOS="Aceptar"
                                    cancelTextIOS="Cancelar"
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                    mode={'datetime'}
                                />
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Button full onPress={_ => navigate('Links')}>
                                    <Text>Agendar</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </ScrollView>
            </View>
        )
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
