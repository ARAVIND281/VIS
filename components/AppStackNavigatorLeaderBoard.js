import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import LeaderBoard1 from '../studentScreens/LeaderBoard1';
import LeaderBoard2 from '../studentScreens/LeaderBoard2';

export const LeaderBoard = createStackNavigator({
    LeaderBoard1: {
    screen: LeaderBoard1,
    navigationOptions: {
      headerShown: false
    }
  },
  LeaderBoard2: {
    screen: LeaderBoard2,
    navigationOptions: {
      headerShown: false
    }
  }
},
  {
    initialRouteName: 'LeaderBoard1'
  }
);