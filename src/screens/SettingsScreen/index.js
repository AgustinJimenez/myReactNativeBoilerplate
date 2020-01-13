import React from 'react'
import { Container, Content, Form, List /* , Body, ListItem  */ } from 'native-base'
import HeaderTitle from '../../components/HeaderTitle'
import DrawerIcon from '../../components/DrawerIcon'
import { connect } from 'react-redux'
import { othersSelector } from '../../selectors/datasetsSelector'
import LangInput from './components/LangInput'
import AppointmentNotificationInput from './components/AppointmentNotificationInput'
//import JSONTree from 'react-native-json-tree'

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
                            <AppointmentNotificationInput />
                            {/* 
                            <ListItem>
                                <Body>
                                    <JSONTree data={this.props.others.logs} />
                                </Body>
                            </ListItem>
                             */}
                        </List>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    others: othersSelector(state),
})

export default connect(mapStateToProps)(SettingsScreen)
