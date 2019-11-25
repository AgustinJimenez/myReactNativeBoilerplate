import React from 'react'
import LoadingScreen from '../LoadingScreen'
import { withNavigation } from 'react-navigation'

class BlankTransitionScreen extends React.Component {

    componentDidMount() {
        let { callback } = this.props.navigation.state.params
        setTimeout(callback, 1000)


    }

    render() {
        return <LoadingScreen />
    }
}
BlankTransitionScreen = withNavigation(BlankTransitionScreen)

export default BlankTransitionScreen