import React from 'react'
import { Content, View, Input, Item, Icon, Text, Button, Form } from 'native-base'
import { StyleSheet, Image } from 'react-native'
import {scale} from '../../../theme/variables/commonStyles'
import ParriOnContainer from '../../../components/ParriOnContainer'
import ImageWelcome from '../../../assets/images/welcome.png'
import ImageEyeHide from '../../../assets/images/eye_hide.png'
import ImageFlame from '../../../assets/images/flame.png'
import brandSecondary from '../../../theme/variables/commonColor.js'
import generalStyles from '../../../theme/variables/commonStyles'
import ToggleEye from './ToggleEye'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import emailIsValid from '../../../utils/emailIsValid'


const styles = StyleSheet.create({
    welcome: { alignSelf: 'center', marginVertical: scale(0.5), width: 135, height: 41 },
    register: {
        marginVertical: scale(0.5),
        flexDirection: 'row',
    },
    flame: { alignSelf: 'center', width: 32.61, height: 52.56 },
    formContainer: { flex: 0.8, justifyContent: 'center' },
    form: { width: '85%', alignSelf: 'center' },
    sigInText: { color: 'black', fontSize: 18 },
    sigInTextDisabled: { color: 'white' },
    sigInButton: { backgroundColor: brandSecondary.brandSecondary, borderRadius: scale(0.2), marginVertical: scale(0.2) },
    sigInButtonDisabled: { backgroundColor: 'gray' },
    inputContainer: { marginTop: scale(0.2), borderRadius: scale(0.2) },
    input: {fontSize: 16, color: 'white' },
    newUserText: { color: brandSecondary.brandSecondary, textAlign: 'center' },
    registerText: { color: brandSecondary.brandSecondary, textAlign: 'center', paddingHorizontal: scale(0.1) },
    
})

const formIsValid = ( email: string, password: string ) => {
    let isValid = true

    if(!email.length || !emailIsValid(email))
        isValid = false
    else if(!password.length)
        isValid = false

    return isValid
}

const LoginScreen = ({  }) => {
    const { t } = useTranslation()

    const [showPassword, setShowPassword] = React.useState(false)
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')

    const inputsValid = formIsValid(email, password)

    return (
        <ParriOnContainer>
            <Image source={ImageFlame} style={styles.flame} />
            <View style={styles.formContainer}>
                <Form style={styles.form}>
                    <Image source={ImageWelcome} style={styles.welcome} resizeMode='contain' />
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 41, fontWeight: '500', fontFamily: 'Reckoner' }}>Bienvenido</Text>
                    <Item regular style={styles.inputContainer}>
                        <Input 
                            placeholder={t('email_or_phone')}
                            placeholderTextColor='white'
                            style={styles.input}
                            returnKeyType='next'
                            value={email}
                            onChangeText={ (text: string) => 
                                setEmail(text)
                            }
                        />
                    </Item>

                    <Item regular style={styles.inputContainer}>
                        <Input 
                            placeholder={t('password')}
                            placeholderTextColor='white' 
                            style={styles.input}
                            returnKeyType='done'
                            secureTextEntry={showPassword}
                            value={password}
                            onChangeText={ (text: string) => 
                                setPassword(text)
                            }
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword) }>
                            <ToggleEye show={showPassword} />
                        </TouchableOpacity>
                    </Item>
                    
                    <Button block style={[styles.sigInButton, !inputsValid && styles.sigInButtonDisabled ]} disabled={formIsValid(email, password)} >
                        <Text style={[ styles.sigInText, !inputsValid && styles.sigInTextDisabled ]}>{t('login')}</Text>
                    </Button>
                    
                    <TouchableOpacity style={[styles.register, generalStyles.center]}>
                        <Text style={styles.newUserText}>¿{t('im_new')}?</Text>
                        <Text style={[styles.registerText, generalStyles.bold]}>{t('register')}</Text>
                    </TouchableOpacity>

                </Form>
            </View>

        </ParriOnContainer>
    )
}
export default LoginScreen