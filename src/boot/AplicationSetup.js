import React, { Component } from "react"
import { StyleProvider } from "native-base"
import * as Expo from "expo"
import getTheme from "../theme/components"
import variables from "../theme/variables/commonColor"
import NavigationContainer from "app/src/Router"

export default class AplicationSetup extends Component 
{
  constructor() 
  {
    super()
    this.state = 
    {
      isReady: false
    }
  }
  async componentWillMount() 
  {
    await Expo.Font.loadAsync
    ({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    })

    this.setState({ isReady: true })
  }

  render() 
  {
    if (!this.state.isReady) 
      return <Expo.AppLoading />

    return (
      <StyleProvider 
      style={getTheme(variables)}
      children=
      {
        <NavigationContainer/>
      }
      />
    )



    
  }
}
