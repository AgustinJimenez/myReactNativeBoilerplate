import React from 'react'
import { Image } from 'react-native'
import { Container, Spinner } from 'native-base'
import dlsLogo from '../../assets/images/dls_logo.png'
import * as Animatable from 'react-native-animatable'
class LoadingScreen extends React.Component {
    // Render any loading content that you like here

    render() {
        return (
            <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Animatable.View
                    animation="fadeIn"
                    delay={1000}
                //useNativeDriver={true}
                >
                    <Image source={dlsLogo} style={{ marginBottom: 20 }} />
                    <Spinner size='large' color='red' />
                </Animatable.View>
            </Container>
        )
    }
}

export default LoadingScreen
