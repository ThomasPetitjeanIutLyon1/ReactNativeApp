import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';

export class HomeScreen extends Component {

  render() {
      console.log(this.props);
      
    return (
        
      <View>
        <Text> home </Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    )
  }
}
