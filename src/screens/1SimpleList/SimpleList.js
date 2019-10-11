import React from 'react'
import { Container, Left, Right, Text, Icon, Content, List, ListItem, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { fetchUsers } from '../../actions'
import { usersSelector } from '../../selectors/datasetsSelector'
import DrawerIcon from '../../components/DrawerIcon'
//import JSONTree from 'react-native-json-tree'
class SimpleList extends React.Component {
    static navigationOptions = {
        title: 'Simple List',
        headerLeft: <DrawerIcon />,
    }

    constructor(props) {
        super(props)
        props.fetchUsers()
    }

    render() {
        return (
            <Container>
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
