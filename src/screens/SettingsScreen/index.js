import React from 'react'
import { Image, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native'

import { Card, CardItem, Body, Item, Label, Text, Input, Button } from 'native-base'

import MapView, { Marker, ProviderPropType } from 'react-native-maps'
import styles from './styles'

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    }

    state = {}

    render = () => {
        return (
            <View
                style={{
                    ...styles.container,
                }}
            ></View>
        )
    }
}
