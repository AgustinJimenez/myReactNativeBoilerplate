import React, { Component } from "react"
import { Button, Body, Header, Title, Left, Icon, Right } from "native-base"

const algo = this.title
export default class AppHeader extends Component 
{
  render() 
  {
    return (
        <Header>
          <Left>
            { this.get_navigator() }
          </Left>
          <Body>
            { this.get_header() }
          </Body>
          <Right/>
        </Header>
    )
  }

  get_header()
  {
    if( this.props.title != null )
      return <Title>{ this.props.title }</Title>
    else if( this .props.img_src != null )
      return <Image source={ this.props.image_src } style={ this.props.image_styles } />
    else 
      return 
  }

  get_navigator()
  {
    if( !this.props.back_button )
      return (
      <Button transparent onPress={() => this.props.navigation.openDrawer() } >
        <Icon name="menu"/>
      </Button>)
    else
      return (
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>)
  }


}