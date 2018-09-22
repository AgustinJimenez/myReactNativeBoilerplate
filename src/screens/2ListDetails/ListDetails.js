import React, { Component } from "react";
import { Container, Left, Right, Text, Icon, Content, List, ListItem, Spinner } from "native-base";
import AppHeader from "app/src/components/AppHeader/AppHeader";
import app_styles from "app/src/theme/variables/commonColor";

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
                                <AppHeader title="2 - List with Detail" {...this.props}/>
                                <Content padder>
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
                                <List  dataArray={this.state.data} renderRow={post => 
                                {
                                
                                        return (
                                                <ListItem button onPress={() => this.props.navigation.push("Detail", { post: post })}>
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