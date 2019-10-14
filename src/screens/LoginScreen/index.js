import React from 'react'
import { Image, ScrollView, View, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { Form, Container, Card, CardItem, Body, Text, Item, Label, Input, Button } from 'native-base'
import { connect } from 'react-redux'
import { fetchAuth } from '../../actions'
import styles from './styles'
//import JSONTree from 'react-native-json-tree'

const loginBackgroundImg = require('../../assets/images/login.jpg')
const dlsLogoImg = require('../../assets/images/dls_logo.png')
const text = {
    subtitle: 'Sistema CRM',
    userNamePlaceholder: 'Usuario*',
    passwordPlaceholder: 'Contraseña*',
    loginButtonText: 'Ingresar',
}

class LoginScreen extends React.Component {
    usernameRef = null
    passwordRef = null

    state = {
        username: '',
        password: '',
    }

    static navigationOptions = {
        header: null,
    }

    loginButtonIsDisabled = _ => {
        if (this.getUsername().trim() === '' || this.getPassword().trim() === '') return true

        return false
    }
    getUsername = _ => this.state.username || ''
    getPassword = _ => this.state.password || ''

    onPasswordChange = password => this.setState({ password })
    onUsernameChange = username => this.setState({ username })
    getParams = _ => ({
        username: this.getUsername(),
        password: this.getPassword(),
    })

    login = _ => {
        this.props.fetchAuth(this.getParams())
    }

    render() {
        return (
            <Container>
                <ImageBackground resizeMode='cover' source={loginBackgroundImg} style={styles.container}>
                    <ScrollView style={[styles.container, styles.darkOpacity]} contentContainerStyle={styles.contentContainer}>
                        <KeyboardAvoidingView behavior='position' style={styles.cardContainer}>
                            <Card>
                                <CardItem>
                                    <Body style={styles.center}>
                                        <Image source={dlsLogoImg} style={styles.welcomeImage} />
                                        <Text /* style={{ fontFamily: 'SpaceMono-Regular' }} */>{text.subtitle}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body style={styles.center}>
                                        <Form style={styles.center}>
                                            <Item floatingLabel>
                                                <Label>{text.userNamePlaceholder}</Label>
                                                <Input
                                                    getRef={ref => (this.usernameRef = ref)}
                                                    onChangeText={this.onUsernameChange}
                                                    value={this.getUsername()}
                                                    autoCapitalize='none'
                                                    autoCorrect={false}
                                                    autoFocus
                                                    returnKeyType='next'
                                                    onSubmitEditing={_ => this.passwordRef._root.focus()}
                                                />
                                            </Item>

                                            <Item floatingLabel>
                                                <Label>{text.passwordPlaceholder}</Label>
                                                <Input
                                                    getRef={ref => (this.passwordRef = ref)}
                                                    onChangeText={this.onPasswordChange}
                                                    value={this.getPassword()}
                                                    secureTextEntry={true}
                                                    returnKeyType='done'
                                                />
                                            </Item>
                                        </Form>

                                        <View style={styles.loginButtonContainer}>
                                            <Button full disabled={this.loginButtonIsDisabled()} onPress={this.login}>
                                                <Text>{text.loginButtonText}</Text>
                                            </Button>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        </KeyboardAvoidingView>
                        {/* <JSONTree data={{ props: this.props, state: this.state }} /> */}
                    </ScrollView>
                </ImageBackground>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    //userSelector: usersSelector(state),
})
const mapDispatchToProps = {
    fetchAuth,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginScreen)
