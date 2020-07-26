import React from 'react'
import { Container, Content, Form, List, Card } from 'native-base'
import { connect } from 'react-redux'
import { othersSelector } from '../../selectors/datasetsSelector'
import LangInput from './components/LangInput'
import AppointmentNotificationInput from './components/AppointmentNotificationInput'
import AppHeader from '../../components/AppHeader'
//import JSONTree from 'react-native-json-tree'

class SettingsScreen extends React.Component {
    render = () => {
        return (
            <Container>
                <AppHeader trans_id='settings' />
                <Content padder>
                    <Card>
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
                    </Card>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state: any) => ({
    others: othersSelector(state),
})

export default connect(mapStateToProps)(SettingsScreen)
