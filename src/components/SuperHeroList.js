import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { List, Avatar } from "react-native-paper";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

function SuperheroList(props) {
  console.log(props.list.length != 0 ? props.list[0].thumbnail.path : "nodata");
  return props.list.map((charac, index) => (
    <List.Item
      title={charac.name}
      left={props => (
        <Avatar.Image
          size={24}
          source={{
            uri: charac.thumbnail.path + "." + charac.thumbnail.extension
          }}
          style={styles.avatar}
        />
      )}
      onPress={() => {
        props.navigation.navigate("Details", {
          charac: charac
        });
      }}
      key={charac.id}
      right={props => <List.Icon {...props} icon="chevron-right" />}
    />
  ));
}
var styles = StyleSheet.create({
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
    // height: Dimensions.get('window').height
  }
});

export default SuperheroList;
