import React, { Component } from "react";
import { Button, Body, Header, Title, Left, Icon, Right } from "native-base";

const algo = this.title;
export default class AppHeader extends Component 
{
 get_header()
 {
  if( this.props.title != null )
   return <Title>{ this.props.title }</Title>;
  else if( this .props.img_src != null )
   return <Image source={ this.props.image_src } style={ this.props.image_styles } />
  else 
   return ;
 }

  render() 
  {
   console.log( this.props );
    return (
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer() } >
              <Icon name="menu"/>
            </Button>
          </Left>
          <Body>
            { this.get_header() }
          </Body>
          <Right/>
        </Header>
    );
  }
}