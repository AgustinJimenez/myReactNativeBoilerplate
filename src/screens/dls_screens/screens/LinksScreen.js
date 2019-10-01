import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Agenda } from 'react-native-calendars'

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' }
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' }
const workout = { key: 'workout', color: 'green' }

import { Container, Header, View, Button, Icon, Fab } from 'native-base'

export default class AgendaScreen extends Component {
    static navigationOptions = {
        title: 'Agenda de citas',
        headerBackTitle: 'Atrás',
    }

    constructor(props) {
        super(props)
        this.state = {
            items: {},
            active: false,
        }
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ flex: 1 }}>
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={'2019-06-02'}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    // markingType={'period'}
                    /*markedDates={{
          //    '2017-05-08': {textColor: '#666'},
          //    '2017-05-09': {textColor: '#666'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          "2017-05-21": {
            dots: [vacation, massage, workout],
            selected: true
          }
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}
        }}*/
                    // monthFormat={'yyyy'}
                    //markingType={"multi-dot"}

                    // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                />
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#1565c0' }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}
                >
                    <Icon name="dots-vertical" type="MaterialCommunityIcons" />
                    <Button onPress={() => navigate('Form')} style={{ backgroundColor: '#34A34F' }}>
                        <Icon name="add" />
                    </Button>
                </Fab>
            </View>
        )
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000
                const strTime = this.timeToString(time)
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = []
                    const numItems = Math.floor(Math.random() * 5)
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Cita para ' + strTime,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                            dots: [vacation, massage, workout],
                        })
                    }
                }
            }
            //console.log(this.state.items);
            const newItems = {}
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key]
            })
            this.setState({
                items: newItems,
            })
        }, 1000)
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem = item => {
        const { navigate } = this.props.navigation
        return (
            <View style={[styles.item, { height: item.height }]}>
                <Text onPress={() => navigate('Settings')}>{item.name}</Text>
            </View>
        )
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        )
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name
    }

    timeToString(time) {
        const date = new Date(time)
        return date.toISOString().split('T')[0]
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
    },
})
