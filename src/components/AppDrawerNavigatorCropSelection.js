import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import CropSelection1 from '../screens/CropSelection1';
import PaddyDetail from '../screens/PaddyDetail';
import Home1 from '../screens/Home';

export const AppDrawerNavigatorCropSelection = createStackNavigator({
  CropSelection1: {
    screen: CropSelection1,
    navigationOptions: {
      headerShown: false
    }
  },
  PaddyDetail: {
    screen: PaddyDetail,
    navigationOptions: {
      headerShown: false
    }
  },
  Home1: {
    screen: Home1,
    navigationOptions: {
      headerShown: false
    }
  },
},
  {
    initialRouteName: 'CropSelection1'
  }
);