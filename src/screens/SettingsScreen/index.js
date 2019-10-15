import React from 'react'
import { Container, Content, Form, List } from 'native-base'
import styles from './styles'
import HeaderTitle from '../../components/HeaderTitle'
import DrawerIcon from '../../components/DrawerIcon'
import LangInput from './components/LangInput'

class SettingsScreen extends React.Component {
    static navigationOptions = {
        headerLeft: <DrawerIcon />,
        headerTitle: <HeaderTitle trans_id='settings' />,
    }

    render = () => {
        return (
            <Container>
                <Content>
                    <Form>
                        <List>
                            <LangInput />
                        </List>
                    </Form>
                </Content>
            </Container>
        )
    }
}

export default SettingsScreen
