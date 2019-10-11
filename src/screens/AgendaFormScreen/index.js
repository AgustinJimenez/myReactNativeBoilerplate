import React from 'react'
import { ScrollView, View } from 'react-native'
import { Card, CardItem, Body, Item, Text, Input, Button } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'
import MapView, { Marker, ProviderPropType } from 'react-native-maps'
import styles from './styles'

class AgendaForm extends React.Component {
    static navigationOptions = {
        title: 'Formulario',
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
                                    <Input placeholder='Cliente' autoFocus />
                                </Item>
                                <Item last>
                                    <Input placeholder='Motivo' />
                                </Item>

                                <CardItem>
                                    <Button onPress={this.showDateTimePicker} bordered info>
                                        <Text>{`${this.state.date.toLocaleDateString()} ${this.state.date.toLocaleTimeString()}`}</Text>
                                    </Button>
                                </CardItem>

                                <DateTimePicker
                                    hideTitleContainerIOS
                                    confirmTextIOS='Aceptar'
                                    cancelTextIOS='Cancelar'
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
                                <Button full onPress={_ => this.props.navigation.navigate('Links')}>
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

export default AgendaForm
