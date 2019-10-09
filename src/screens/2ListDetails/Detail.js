import React, { Component } from 'react'
import { Container, Header, Body, Left, Right, Text, Button, Icon, Title, Content, Card, CardItem } from 'native-base'
import AppHeader from '../../../src/components/AppHeader/AppHeader'
import app_styles from '../../../src/theme/variables/commonColor'
const default_post = { title: '', body: '' }

export default class ListDetails extends Component {
    constructor(props) {
        super(props)
        this.state = { post: default_post }
        this.setDatas()
    }

    setDatas() {
        this.setState({ post: this.props.navigation.getParam('post', default_post) })
    }

    render() {
        return (
            <Container>
                <AppHeader title='2 - Detail' back_button={true} {...this.props} />
                <Content padder>
                    <Card>
                        <CardItem style={{ backgroundColor: app_styles.brandPrimary }}>
                            <Left>
                                <Body>
                                    <Text style={{ color: app_styles.inverseTextColor }}>{this.state.post.title}</Text>
                                </Body>
                            </Left>
                        </CardItem>

                        <CardItem>
                            <Body>
                                <Text>{this.state.post.body}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}
