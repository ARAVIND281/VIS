import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import feedBack1 from '../admin/feedBack1';
import feedBack2 from '../admin/feedBack2';

export const AppStackNavigatorAdminFeedBack = createStackNavigator({
    feedBack1: {
    screen: feedBack1,
    navigationOptions: {
      headerShown: false
    }
  },
  feedBack2: {
    screen: feedBack2,
    navigationOptions: {
      headerShown: false
    }
  }
},
  {
    initialRouteName: 'feedBack1'
  }
);