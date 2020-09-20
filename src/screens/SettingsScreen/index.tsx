import React from 'react'
import { Container, Content, Form, List, Card } from 'native-base'
import { connect } from 'react-redux'
import LangInput from './components/LangInput'
import AppHeader from '../../components/AppHeader'
import { datasetSelector } from '../../redux/selectors'
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
                            </List>
                        </Form>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state: any) => ({
    others: datasetSelector(state, 'others'),
})

export default connect(mapStateToProps)(SettingsScreen)
