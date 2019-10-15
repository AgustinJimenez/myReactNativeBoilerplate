import React from 'react'
import { authSelector } from '../../selectors/datasetsSelector'
import { connect } from 'react-redux'
import LoadingScreen from '../LoadingScreen'
import { withTranslation } from 'react-i18next'
import { langSelector } from '../../selectors/datasetsSelector'

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        if (props.lang.data !== props.i18n.language) props.i18n.changeLanguage(props.lang.data)
        props.navigation.navigate(!!props.auth.data.token ? 'App' : 'Login')
    }

    // Render any loading content that you like here
    render() {
        return <LoadingScreen />
    }
}

const mapStateToProps = state => ({
    auth: authSelector(state),
    lang: langSelector(state),
})
const mapDispatchToProps = {
    //fetchUsers,
}

AuthLoadingScreen = withTranslation()(AuthLoadingScreen)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthLoadingScreen)
