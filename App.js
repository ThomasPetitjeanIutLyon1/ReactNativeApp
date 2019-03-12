import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

export class App extends Component {
  render() {
    return (
     <HomeScreen navigation={this.props.navigation}></HomeScreen>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Details: DetailScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);