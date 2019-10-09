import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { authTokenSelector } from '../../selectors/authSelector'
import { connect } from 'react-redux'

class AuthLoadingScreen extends React.Component {
    componentDidMount() {
        this._bootstrapAsync()
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(this.props.token ? 'App' : 'Auth')
    }

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle='default' />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    token: authTokenSelector(state),
})
const mapDispatchToProps = {
    //fetchUsers,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthLoadingScreen)
