import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, List, ListItem, Text, Left, Right, Icon, Item } from "native-base";
import app_styles from "app/native-base-theme/variables/commonColor";//brandPrimary

const routes = 
[
  { title: "Home", route: "Home", icon: "home" },
  { title: "1 - Simmple List", route: "SimpleList" },
  { title: "2 - List Details", route: "TwoListDetails" },
];

const sidebar_top_img = require('app/assets/images/logo.png');

const SidebarList = (routes) => 
{
  return (
    <List primary dataArray={routes} contentContainerStyle={{ marginTop: 120 }} renderRow={route => 
    {
        return SidebarItem( route );
    }}/>
  );
}

const SidebarContent = 
(
  <Container>
    <Content style={{ flex: 1, backgroundColor: app_styles.brandPrimary, top: -1 }}>          
      <Image source={ sidebar_top_img } style={{ height: 120, width: "100%", alignSelf: "stretch", position: "absolute" }} />
      { SidebarList( routes ) }
    </Content>
  </Container>
);



const SidebarItem = (route) =>
{
  
  return (
  <ListItem button onPress={() => this.props.navigation.navigate( route.route )} >
    <Left>
      <Text style={{ color: app_styles.inverseTextColor }}>{route.title}</Text>
    </Left>

    <Right>
      <Icon active name={ route.icon } />
    </Right>

  </ListItem>
)};

export default class SideBar extends Component 
{
  render () 
  {
    return SidebarContent;
  }
}