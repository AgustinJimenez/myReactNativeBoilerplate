import React, { Component } from "react";
import { Button, Container, Body, Content, Header, Title, Left, Icon, Right } from "native-base";

export default class HomeScreen extends Component 
{
  render() 
  {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer() } >
              <Icon name="menu"/>
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>

        </Content>
      </Container>
    );
  }
}
