import React from 'react'
import { authSelector } from '../../selectors/datasetsSelector'
import { connect } from 'react-redux'
import LoadingScreen from '../LoadingScreen'

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        //console.log('_bootstrapAsync ===> ', { token: props.auth.data.token, props: this.props })
        props.navigation.navigate(!!props.auth.data.token ? 'App' : 'Login')
    }

    // Render any loading content that you like here
    render() {
        return <LoadingScreen />
    }
}

const mapStateToProps = state => ({
    auth: authSelector(state),
})
const mapDispatchToProps = {
    //fetchUsers,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthLoadingScreen)
