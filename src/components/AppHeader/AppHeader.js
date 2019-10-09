import React from 'react'
import { Button, Body, Header, Title, Left, Icon, Right } from 'native-base'
import { withNavigation } from 'react-navigation'

const AppHeader = props => {
    let { title, img_src, image_src, image_styles, back_button, navigation } = props
    //console.log('AppHeader ===> ', { title, img_src, image_src, image_styles, back_button, navigation })

    var header, navigator

    if (title != null) header = <Title>{title}</Title>
    else if (img_src != null) header = <Image source={image_src} style={image_styles} />
    else {
    }

    if (!back_button)
        navigator = (
            <Button transparent onPress={navigation.openDrawer}>
                <Icon name='menu' />
            </Button>
        )
    else
        navigator = (
            <Button transparent onPress={navigation.goBack}>
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
export default withNavigation(AppHeader)
