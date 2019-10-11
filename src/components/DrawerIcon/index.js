import React from 'react'
import { withNavigation } from 'react-navigation'
import { Button, Icon } from 'native-base'

const DrawerIcon = props => (
    <Button transparent onPress={props.navigation.openDrawer}>
        <Icon name='menu' />
    </Button>
)

export default withNavigation(DrawerIcon)
