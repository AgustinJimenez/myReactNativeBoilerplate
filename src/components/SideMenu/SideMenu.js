
import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Container, Content, Image, List, ListItem, Text } from "native-base";

const routes = 
[
  { title: "Home", route: "Home" },
  { title: "1 - Simmple List", route: "OneSimpleList" },
  { title: "2 - List Details", route: "TwoListDetails" },
];
export default class SideMenu extends Component 
{

  render () 
  {
    return (
      <Container>

        <Content>
        
          <List dataArray={routes} contentContainerStyle={{ marginTop: 120 }} renderRow={route => 
          {
              return (
                <ListItem button onPress={() => this.props.navigation.navigate( route.route )} >
                  <Text>{route.title}</Text>
                </ListItem>
              );
          }}/>

        </Content>

      </Container>
    );
  }
}