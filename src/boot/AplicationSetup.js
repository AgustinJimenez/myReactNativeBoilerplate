import React, { Component } from "react"
import { StyleProvider } from "native-base"
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
      appIsReady: false
    }
  }
  async componentWillMount() 
  {
    /*
    await Expo.Font.loadAsync
    ({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    })
    */

    this.setState({ appIsReady: true })
  }

  render() 
  {
/*
    if (!this.state.appIsReady) 
      return <Expo.AppLoading />
*/
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
