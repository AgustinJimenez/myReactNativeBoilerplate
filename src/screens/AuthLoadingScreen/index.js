import React from 'react'
import { authTokenSelector } from '../../selectors/authSelector'
import { connect } from 'react-redux'
import LoadingScreen from '../LoadingScreen'

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        //console.log('_bootstrapAsync ===> ', { token: props.token })
        props.navigation.navigate(!!props.token ? 'Home' : 'Auth')
    }

    // Render any loading content that you like here
    render() {
        return <LoadingScreen />
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
