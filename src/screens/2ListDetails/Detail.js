import React, { Component } from "react";
import { Container, Header, Body, Left, Right, Text, Button, Icon, Title, Content, Card, CardItem } from "native-base";

const default_post = { title: "", body: "" };

export default class ListDetails extends Component 
{

 constructor(props)
 {
  super(props);
  this.state = {post: default_post};
 }
 componentDidMount()
 {
  this.setDatas();
 }

 setDatas()
 {
    this.setState({post: this.props.navigation.getParam("post", default_post)});
    console.log( this.state );
 }

 render()
 {
         return (
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title>2 - Detail</Title>
              </Body>
              <Right/>
            </Header>
              <Content>
                <Card style={{flex: 0}}>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text>{this.state.post.title}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{this.state.post.body}</Text>
                    </Body>
                  </CardItem>
                </Card>       
              </Content>
          </Container>
         );
 }

}