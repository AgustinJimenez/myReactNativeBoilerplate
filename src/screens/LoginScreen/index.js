import React from 'react'
import { Image, ScrollView, View, ImageBackground } from 'react-native'
import { Form, Container, Card, CardItem, Body, Text, Item, Label, Input, Button } from 'native-base'
import { connect } from 'react-redux'
import { login } from '../../actions'
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

    submit = _ => {
        this.props.login(this.getParams())
    }

    render() {
        return (
            <Container>
                <ImageBackground resizeMode='cover' source={loginBackgroundImg} style={styles.container}>
                    <ScrollView style={[styles.container, styles.darkOpacity]} contentContainerStyle={styles.contentContainer}>
                        <View style={styles.cardContainer}>
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
                                                    //placeholder={text.userNamePlaceholder}
                                                    onChangeText={this.onUsernameChange}
                                                    value={this.getUsername()}
                                                    autoCapitalize='none'
                                                    autoCorrect={false}
                                                    autoFocus
                                                />
                                            </Item>

                                            <Item floatingLabel>
                                                <Label>{text.passwordPlaceholder}</Label>
                                                <Input
                                                    //placeholder={text.passwordPlaceholder}
                                                    onChangeText={this.onPasswordChange}
                                                    value={this.getPassword()}
                                                    secureTextEntry={true}
                                                />
                                            </Item>
                                        </Form>

                                        <View style={styles.loginButtonContainer}>
                                            <Button full disabled={this.loginButtonIsDisabled()} onPress={this.submit}>
                                                <Text>{text.loginButtonText}</Text>
                                            </Button>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
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
    login,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginScreen)
