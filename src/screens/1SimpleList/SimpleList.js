import React, { Component } from "react"
import { Container, Left, Right, Text, Icon, Content, List, ListItem, Spinner } from "native-base"
import AppHeader from "app/src/components/AppHeader/AppHeader"
import { connect } from 'react-redux';
import { fetch } from '../../actions'
import JSONTree from 'react-native-json-tree'

class SimpleList extends Component {
        state =
                {

                }

        static getDerivedStateFromProps(props, state) {

                state.data = props.data
                state.error = props.error
                state.loading = props.loading

                return state
        }

        componentDidMount() {
                this.props.fetch({ lol: 'usuarios' })
        }

        render() {
                return (
                        <Container>
                                <AppHeader title="1 - Simple List" {...this.props} />
                                <Content>
                                        {this.ShowContent()}
                                        <JSONTree data={{ props: this.props, state: this.state }} />
                                </Content>
                        </Container>
                )
        }

        ShowContent() {
                if (this.state.loading)
                        return <Spinner size="large" primary />
                else
                        return (
                                <List dataArray={this.state.data} renderRow={(user, _, key) => {

                                        return (
                                                <ListItem button key={key}>
                                                        <Left>
                                                                <Text>{user.name}</Text>
                                                        </Left>

                                                        <Right>
                                                                <Icon name="arrow-forward" />
                                                        </Right>
                                                </ListItem>
                                        )

                                }}>
                                </List>

                        )

        }


}
const mapStateToProps = ({ data, loading, error }) => ({
        data,
        loading,
        error
})
const mapDispatchToProps = {
        fetch,
}
export default connect(mapStateToProps, mapDispatchToProps)(SimpleList);