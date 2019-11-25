import React from 'react'
import { Image, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { Form, Container, Content, Card, CardItem, Body, Text, Item, Label, Input, Button, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { fetchAuth, setOthers } from '../../actions'
import styles from './styles'
import { withTranslation } from 'react-i18next'
import { authSelector, othersSelector } from '../../selectors/datasetsSelector'
/* import JSONTree from 'react-native-json-tree' */
import { API_DOMAIN } from '../../../env'

const loginBackgroundImg = require('../../assets/images/login.jpg')
const dlsLogoImg = require('../../assets/images/dls_logo.png')

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
        if (this.getUsername().trim() === '' || this.getPassword().trim() === '' || this.getPassword().trim().length < 3) return true

        return false
    }
    getUsername = _ => this.props.others.data.username || ''
    getPassword = _ => this.state.password || ''

    onPasswordChange = password => this.setState({ password })
    onUsernameChange = username => this.props.setOthers({ username })
    getParams = _ => ({
        name: this.getUsername(),
        password: this.getPassword(),
    })

    login = _ => {
        this.props.fetchAuth(this.getParams())
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
                                        <Text /* style={{ fontFamily: 'SpaceMono-Regular' }} */>{this.props.t('crm_system')}</Text>
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
                                                    onSubmitEditing={_ => this.passwordRef._root.focus()}
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
                                            {this.props.auth.loading ? <Spinner color='white' /> : <Text>{this.props.t('login')}</Text>}
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

const mapStateToProps = state => ({
    auth: authSelector(state),
    others: othersSelector(state),
})
const mapDispatchToProps = {
    fetchAuth,
    setOthers,
}
LoginScreen = withTranslation()(LoginScreen)
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
