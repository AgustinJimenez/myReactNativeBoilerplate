import React, { Component } from "react";
import { Container, Header, Body, Left, Right, Text, Button, Icon, Title, Content, List, ListItem, Spinner } from "native-base";

const site = 'https://jsonplaceholder.typicode.com/posts';

export default class ListDetails extends Component 
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
                this.getPostsDatas();
        }

        getPostsDatas()
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
                                                <Title>2 - List with Detail</Title>
                                        </Body>
                                        <Right/>
                                </Header>
                                <Content>
                                        { this.ShowContent() }
                                </Content>
                        </Container>
                );
        }

        ShowContent()
        {
                if( this.state.isLoading )
                        return <Spinner size="large" primary/>;
                else
                        return (
                                <List dataArray={this.state.data} renderRow={post => 
                                {
                                
                                        return (
                                                <ListItem button onPress={() => this.props.navigation.push("TwoDetails", { post: post })}>
                                                        <Left>
                                                                <Text>{post.title}</Text>
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








}