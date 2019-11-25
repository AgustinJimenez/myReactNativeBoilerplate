import React from 'react'
import { withNavigation } from 'react-navigation'
import { Button, Icon } from 'native-base'

const DrawerIcon = props => (
    <Button transparent onPress={props.navigation.openDrawer} style={{ marginTop: 6 }}>
        <Icon name='menu' style={{ color: 'white' }} />
    </Button>
)

export default withNavigation(DrawerIcon)
