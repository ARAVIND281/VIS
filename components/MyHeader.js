import React, { Component } from 'react';
import { Header, Icon, } from 'react-native-elements';
import { Image, View, Text, StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export default class MyHeader extends Component {
  render() {
    return (
      <Header
        centerComponent={{ text: this.props.title, style: { color: 'white', fontSize: RFValue(20), fontWeight: "bold", } }}
        rightComponent={<Image style={{ width: '92%', height: '100%' }}
          source={require('../assets/logo.png')}
        />}
        leftComponent={<Icon name='bars' type='font-awesome-5' onPress={() => this.props.navigation.toggleDrawer()} color="#ffffff"/>}
        backgroundColor="#1338BF"//#0900BC
      />

    )
  }

}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'skyblue',
  },
  text: {
    color: 'white',
    padding: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -60,
  },
});