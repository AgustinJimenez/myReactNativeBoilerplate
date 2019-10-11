import React from 'react'
import { withNavigation } from 'react-navigation'
import { Button, Icon } from 'native-base'

class DrawerIcon extends React.Component {
    render() {
        return (
            <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu' />
            </Button>
        )
    }
}

export default withNavigation(DrawerIcon)
