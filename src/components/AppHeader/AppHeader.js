import React from 'react'
import { Button, Body, Header, Title, Left, Icon, Right } from 'native-base'

const AppHeader = props => {
    var header, navigator

    if (props.title != null) header = <Title>{props.title}</Title>
    else if (props.img_src != null) header = <Image source={props.image_src} style={props.image_styles} />
    else {
    }

    if (!props.back_button)
        navigator = (
            <Button transparent onPress={() => props.navigation.openDrawer()}>
                <Icon name='menu' />
            </Button>
        )
    else
        navigator = (
            <Button transparent onPress={() => props.navigation.goBack()}>
                <Icon name='arrow-back' />
            </Button>
        )

    return (
        <Header>
            <Left>{navigator}</Left>
            <Body>{header}</Body>
            <Right />
        </Header>
    )
}
export default AppHeader
