import React from 'react'
import { Image, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { Form, Container, Content, Card, CardItem, Body, Text, Item, Label, Input, Button, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { actionAuthSaga, setOthersDatasetAction } from '../../actions'
import styles from './styles'
import { withTranslation } from 'react-i18next'
import { authSelector, othersSelector } from '../../selectors/datasetsSelector'
/* import JSONTree from 'react-native-json-tree' */

import loginBackgroundImg from '../../assets/images/login.jpg'
import dlsLogoImg from '../../assets/images/company_logo.png'

class LoginScreen extends React.Component {
    usernameRef: any = null
    passwordRef: any = null

    state: any = {
        username: null,
        password: 'admin123',
        submiting: false,
        timer: 1000,
        controlTimeEnabled: true,
    }

    loginButtonIsDisabled = () => {
        if (
            (this.state.submiting && this.getUsername().trim() === '') ||
            this.getPassword().trim() === '' ||
            this.getPassword().trim().length < 3 ||
            !this.state.controlTimeEnabled
        )
            return true

        return false
    }
    getUsername = () => this.props.others.username || ''
    getPassword = () => this.state.password || ''

    onPasswordChange = (password: string) => this.setState({ password })
    onUsernameChange = (username: string) => this.props.setOthers({ username })
    getParams = () => ({
        name: this.getUsername(),
        password: this.getPassword(),
    })

    login = async () => {
        await this.setState({ submiting: true, controlTimeEnabled: false })
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.props.authAction(this.getParams(), () => this.setState({ submiting: false }))
            this.setState(state => {
                state.timer = state.timer * 1.5
                state.controlTimeEnabled = true
                return state
            })
        }, this.state.timer)
    }

    render() {
        return (
            <Container>
                <ImageBackground resizeMode='cover' source={loginBackgroundImg} style={styles.container}>
                    <Content style={[styles.container, styles.darkOpacity]} contentContainerStyle={styles.contentContainer}>
                        <KeyboardAvoidingView behavior='position' style={styles.cardContainer}>
                            <Card>
                                <CardItem>
                                    <Body style={styles.center}>
                                        <Image source={dlsLogoImg} style={styles.welcomeImage} />
                                        <Text /* style={{ fontFamily: 'SpaceMono-Regular' }} */>App System</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body style={styles.center}>
                                        <Form style={styles.center}>
                                            <Item floatingLabel>
                                                <Label>{this.props.t('username') + '*'}</Label>
                                                <Input
                                                    getRef={ref => (this.usernameRef = ref)}
                                                    onChangeText={this.onUsernameChange}
                                                    value={this.getUsername()}
                                                    autoCapitalize='none'
                                                    autoCorrect={false}
                                                    autoFocus={!this.getUsername()}
                                                    returnKeyType='next'
                                                    onSubmitEditing={() => this.passwordRef._root.focus()}
                                                />
                                            </Item>

                                            <Item floatingLabel>
                                                <Label>{this.props.t('password') + '*'}</Label>
                                                <Input
                                                    autoFocus={!!this.getUsername()}
                                                    getRef={ref => (this.passwordRef = ref)}
                                                    onChangeText={this.onPasswordChange}
                                                    value={this.getPassword()}
                                                    secureTextEntry={true}
                                                    autoCapitalize='none'
                                                    returnKeyType='done'
                                                />
                                            </Item>
                                        </Form>
                                        <Button block disabled={this.loginButtonIsDisabled()} onPress={this.login} style={styles.loginButtonContainer}>
                                            {this.state.submiting ? <Spinner color='white' /> : <Text>{this.props.t('login')}</Text>}
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                        </KeyboardAvoidingView>
                        {/* <JSONTree data={this.props} /> */}
                    </Content>
                </ImageBackground>
            </Container>
        )
    }
}

const mapStateToProps = (state: any) => ({
    auth: authSelector(state),
    others: othersSelector(state),
})
const mapDispatchToProps = {
    authAction: actionAuthSaga,
    setOthers: setOthersDatasetAction,
}
LoginScreen = withTranslation()(LoginScreen)
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginScreen)
