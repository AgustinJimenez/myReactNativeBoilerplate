import React, { Component } from "react";
import { Container, Content } from "native-base";
import AppHeader from "app/src/components/AppHeader/AppHeader";

export default class HomeScreen extends Component 
{
  render() 
  {
    return (
      <Container>
        <AppHeader title="Inicio" {...this.props}/>
        <Content padder>

        </Content>
      </Container>
    );
  }
}
