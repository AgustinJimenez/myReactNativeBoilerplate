import React from 'react'
import { Image, ScrollView, View, ImageBackground } from 'react-native'
import { Container, Card, CardItem, Body, Text, Item, Label, Input, Button } from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'

const loginBackgroundImg = require('../../assets/images/login.jpg')
const dlsLogoImg = require('../../assets/images/dls_logo.png')
const text = {
    subtitle: 'Sistema CRM',
    userNamePlaceholder: 'Usuario*',
    passwordPlaceholder: 'Contraseña*',
    loginButtonText: 'Ingresar',
}

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <Container>
                <ImageBackground
                    resizeMode='cover'
                    source={loginBackgroundImg}
                    style={{
                        ...styles.container,
                    }}
                >
                    <ScrollView
                        style={{
                            ...styles.container,
                            backgroundColor: 'rgba(0,0,0,0.65)',
                        }}
                        contentContainerStyle={styles.contentContainer}
                    >
                        <View style={styles.cardContainer}>
                            <Card>
                                <CardItem>
                                    <Body style={styles.body}>
                                        <Image source={dlsLogoImg} style={styles.welcomeImage} />
                                        <Text /* style={{ fontFamily: 'SpaceMono-Regular' }} */>{text.subtitle}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body style={styles.body}>
                                        <Item inlineLabel>
                                            <Label>{text.userNamePlaceholder}</Label>
                                            <Input />
                                        </Item>

                                        <Item inlineLabel>
                                            <Label>{text.passwordPlaceholder}</Label>
                                            <Input secureTextEntry={true} />
                                        </Item>

                                        <View style={styles.loginButtonContainer}>
                                            <Button onPress={() => navigate('Links')}>
                                                <Text>{text.loginButtonText}</Text>
                                            </Button>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
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
    //fetchUsers,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginScreen)
