import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import { Provider as PaperProvider } from 'react-native-paper';

//api mdp : LwqL:UXT7asQNG3

export class App extends Component {
  render() {
    return (
      <PaperProvider>
        <HomeScreen navigation={this.props.navigation}></HomeScreen>
      </PaperProvider>
   
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: App,
      navigationOptions: {
        title: 'Accueil'
      }
    },
    Details: {
      screen: DetailScreen,
      navigationOptions: {
        title: 'Détail du super héro'
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
