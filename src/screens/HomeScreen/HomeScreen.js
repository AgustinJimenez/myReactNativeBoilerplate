import React, { Component } from 'react'
import { Container, Content, Text } from 'native-base'
import AppHeader from 'app/src/components/AppHeader/AppHeader'

const title = 'Home'
export default class HomeScreen extends Component {
    render() {
        return (
            <Container>
                <AppHeader title={title} {...this.props} />
                <Content padder>
                    <Text>Hello World</Text>
                </Content>
            </Container>
        )
    }
}
