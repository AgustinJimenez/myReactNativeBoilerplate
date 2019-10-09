import React from 'react'
import { Container, Left, Right, Text, Icon, Content, List, ListItem, Spinner } from 'native-base'
import AppHeader from '../../../src/components/AppHeader/AppHeader'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../../actions'
//import JSONTree from 'react-native-json-tree'
import { usersSelector } from '../../selectors/datasetsSelector'

const renderLoading = (loading, data) => loading && !data && <Spinner size='large' primary />
const renderList = (loading, data) =>
    !loading &&
    data && (
        <List
            dataArray={data}
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
    )

const SimpleList = props => {
    const dispatch = useDispatch()
    let { data, loading, error } = useSelector(usersSelector)

    React.useEffect(_ => {
        dispatch(fetchUsers)
    }, [])

    return (
        <Container>
            <AppHeader title='1 - Simple List' />
            <Content>
                {renderLoading(loading, data)}
                {renderList(loading, data)}
                {/* <JSONTree data={{ props, selector, data, loading, error }} /> */}
            </Content>
        </Container>
    )
}

export default SimpleList
