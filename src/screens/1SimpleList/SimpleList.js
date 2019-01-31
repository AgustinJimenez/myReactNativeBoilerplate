import React, { Component } from "react"
import { Container, Left, Right, Text, Icon, Content, List, ListItem, Spinner } from "native-base"
import AppHeader from "app/src/components/AppHeader/AppHeader"

const site = 'https://jsonplaceholder.typicode.com/users'

export default class SimpleList extends Component 
{
        state = 
        {
                data: [],
                isLoading: true
        }

        constructor(props)
        {
                super(props)
        }

        componentDidMount()
        {
                this.getUsersDatas()
        }

        getUsersDatas()
        {
                fetch( site )
                .then((response) => response.json())
                .then((responseJson) => 
                {

                        this.setState
                        ({
                                isLoading: false,
                                data: responseJson,
                        })
                })
                .catch((error) => 
                {
                        console.error(error)
                })
        }
        

        render()
        {
                return (
                        <Container>
                                <AppHeader title="1 - Simple List" {...this.props}/>
                                <Content>
                                        { this.ShowContent() }
                                </Content>
                        </Container>
                )
        }

        ShowContent()
        {
                if( this.state.isLoading )
                        return <Spinner size="large" primary/>
                else
                        return (
                                <List dataArray={this.state.data} renderRow={user => 
                                {
                                
                                        return (
                                        <ListItem button>
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