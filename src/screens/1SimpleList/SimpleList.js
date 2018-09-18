import React, { Component } from "react";
import { Container, Header, Body, Left, Right, Text, Button, Icon, Title, Content, List, ListItem, Spinner } from "native-base";

const site = 'https://jsonplaceholder.typicode.com/users';

export default class SimpleList extends Component 
{
        state = 
        {
                data: [],
                isLoading: true
        };

        constructor(props)
        {
                super(props);
        }

        componentDidMount()
        {
                this.getUsersDatas();
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
                        });
                })
                .catch((error) => 
                {
                        console.error(error);
                });
        }

        ShowContent()
        {
                if( this.state.isLoading )
                        return <Spinner size="large" primary/>;
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
                                        );
                
                                }}>                                 
                                </List>
                        );
                
        }
        

        render()
        {
                return (
                        <Container>
                                <Header>
                                        <Left>
                                                <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")} >
                                                        <Icon name="menu" />
                                                </Button>
                                        </Left>
                                        <Body>
                                                <Title>1 - Simple List</Title>
                                        </Body>
                                        <Right/>
                                </Header>
                                <Content>
                                        { this.ShowContent() }
                                </Content>
                        </Container>
                );
        }

        
}