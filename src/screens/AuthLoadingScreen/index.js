import React from 'react'
import { authSelector, langSelector } from '../../selectors/datasetsSelector'
import { connect } from 'react-redux'
import LoadingScreen from '../LoadingScreen'
import { withTranslation } from 'react-i18next'
import * as Animatable from 'react-native-animatable'

class AuthLoadingScreen extends React.Component {

    animationContainer = null

    constructor(props) {
        super(props)
        if (props.lang !== props.i18n.language)
            props.i18n.changeLanguage(props.lang)
    }

    continue = async () => {
        //await this.animationContainer.fadeOut(500)
        setTimeout(() => this.props.navigation.navigate(!!this.props.auth.token ? 'App' : 'Login'), 300)
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
}

AuthLoadingScreen = withTranslation()(AuthLoadingScreen)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthLoadingScreen)
