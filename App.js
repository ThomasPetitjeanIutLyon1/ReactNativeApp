import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

//api mdp : LwqL:UXT7asQNG3

export class App extends Component {
	render() {
		return <HomeScreen navigation={this.props.navigation} />;
	}
}

const AppNavigator = createStackNavigator(
	{
		Home: App,
		Details: DetailScreen
	},
	{
		initialRouteName: 'Home'
	}
);

export default createAppContainer(AppNavigator);
