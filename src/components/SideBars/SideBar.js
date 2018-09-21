import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, List, ListItem, Text, Left, Right, Icon, Item } from "native-base";

import styles from './styles';

const routes = 
[
  { title: "Home", route: "Home", icon: "home" },
  { title: "1 - Simmple List", route: "SimpleList" },
  { title: "2 - List Details", route: "TwoListDetails" },
];

const sidebar_top_img = require('app/assets/images/logo.png');

export default class SideBar extends Component 
{
  render () 
  {
    return (
    <Container>
      <Content style={ styles.content }>          
        <Image source={ sidebar_top_img } style={ styles.sidebar_top_img } />
        
        <List primary dataArray={routes} contentContainerStyle={{ marginTop: 120 }} renderRow={route => 
        {
            
          return (
            <ListItem button onPress={() => this.props.navigation.navigate( route.route )} >
              <Left>
                <Text style={ styles.text_color }>{route.title}</Text>
              </Left>

              <Right>
                <Icon active name={ route.icon } />
              </Right>

            </ListItem>
            );

        }}/>

      </Content>
    </Container>);
  }
}