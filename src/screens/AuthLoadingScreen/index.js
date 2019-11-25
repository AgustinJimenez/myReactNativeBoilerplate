import React from 'react'
import { authSelector, langSelector } from '../../selectors/datasetsSelector'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import LoadingScreen from '../LoadingScreen'
import { withTranslation } from 'react-i18next'
import { resetAppLoadings, resetAppErrors } from '../../actions'
import * as Animatable from 'react-native-animatable'

class AuthLoadingScreen extends React.Component {

    animationContainer = null

    constructor(props) {
        super(props)
        props.resetAppLoadings()
        props.resetAppErrors()
        if (props.lang.data !== props.i18n.language)
            props.i18n.changeLanguage(props.lang.data)
    }

    continue = async _ => {
        //await this.animationContainer.fadeOut(500)
        setTimeout(_ => this.props.navigation.navigate(!!this.props.auth.data.token ? 'App' : 'Login'), 300)
    }

    render() {
        return (
            <Animatable.View
                style={{
                    flex: 1
                }}
                animation="fadeIn"
                delay={200}
                //onTransitionEnd={this.continue}
                onAnimationEnd={this.continue}
                ref={ref => {
                    if (ref)
                        this.animationContainer = ref
                }}
            //useNativeDriver={true}
            >
                <LoadingScreen />
            </Animatable.View>
        )
    }
}

const mapStateToProps = state => ({
    auth: authSelector(state),
    lang: langSelector(state),
})
const mapDispatchToProps = {
    resetAppLoadings,
    resetAppErrors,
}

AuthLoadingScreen = withTranslation()(AuthLoadingScreen)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthLoadingScreen)
