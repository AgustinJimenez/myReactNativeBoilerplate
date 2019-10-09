import React from 'react'
import { Container, Left, Right, Text, Icon, Content, List, ListItem, Spinner } from 'native-base'
import AppHeader from '../../../src/components/AppHeader/AppHeader'
import { connect } from 'react-redux'
import { fetchUsers } from '../../actions'
import { usersSelector } from '../../selectors/datasetsSelector'
//import JSONTree from 'react-native-json-tree'
class SimpleList extends React.Component {
    constructor(props) {
        super(props)
        props.fetchUsers()
    }

    render() {
        return (
            <Container>
                <AppHeader title='1 - Simple List' />
                <Content>
                    {this.props.userSelector.loading && !this.props.userSelector.data && <Spinner size='large' primary />}
                    {!this.props.userSelector.loading && this.props.userSelector.data && (
                        <List
                            dataArray={this.props.userSelector.data}
                            renderRow={(user, _, key) => (
                                <ListItem button key={key}>
                                    <Left>
                                        <Text>{user.name}</Text>
                                    </Left>

                                    <Right>
                                        <Icon name='arrow-forward' />
                                    </Right>
                                </ListItem>
                            )}
                        />
                    )}
                    {/* <JSONTree data={{ props: this.props, helo: 'there' }} /> */}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    userSelector: usersSelector(state),
})
const mapDispatchToProps = {
    fetchUsers,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SimpleList)
