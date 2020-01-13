import React from 'react'
import { Accordion, Content, Container, List, ListItem, Left, Thumbnail, Text, Body, Right } from 'native-base'
import { useSelector } from 'react-redux'
import { listNotificationsSelector } from '../../selectors/notificationsSelector'
import NoDataLabel from '../../components/NoDataLabel'
import { dateForUsersFormat, hoursMinutesSecondsFormat } from '../../utils/dateFormat'
import styles from './styles'
import { TouchableOpacity } from 'react-native'
import moment from 'moment'

export const NotificationsList = (props: any) => {
    let notifications = useSelector(listNotificationsSelector)
    if (!notifications.length) return <NoDataLabel />

    return (
        <Container>
            <Content>
                <List>
                    {notifications.map(({ title, message, timestamp }: any, key: any) => (
                        <TouchableOpacity onPress={() => {}} key={key}>
                            <ListItem avatar>
                                <Body>
                                    <Text>{title}</Text>
                                    <Text note>{message}</Text>
                                    {!!timestamp && <Text note>{moment(timestamp).format(dateForUsersFormat)}</Text>}
                                </Body>
                                <Right>{!!timestamp && <Text note>{moment(timestamp).format(hoursMinutesSecondsFormat)}</Text>}</Right>
                            </ListItem>
                        </TouchableOpacity>
                    ))}
                </List>
            </Content>
        </Container>
    )
}
