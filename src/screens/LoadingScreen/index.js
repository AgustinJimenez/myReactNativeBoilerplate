import React from 'react'
import { ActivityIndicator, Image } from 'react-native'
import { Container } from 'native-base'
import dlsLogo from '../../assets/images/dls_logo.png'

class LoadingScreen extends React.Component {
    // Render any loading content that you like here
    render() {
        return (
            <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={dlsLogo} style={{ marginBottom: 20 }} />
                <ActivityIndicator size='large' color='red' />
            </Container>
        )
    }
}

export default LoadingScreen
