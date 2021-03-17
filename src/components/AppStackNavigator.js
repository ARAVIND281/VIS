import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Home1 from '../screens/Home';
import CropSelection1 from '../screens/CropSelection1';
import PaddyDetail from '../screens/PaddyDetail';
import {AppDrawerNavigatorCropSelection} from "./AppDrawerNavigatorCropSelection"
export const AppStackNavigator = createStackNavigator({
  Home1: {
    screen: Home1,
    navigationOptions: {
      headerShown: false
    }
  },
  CropSelection1: {
    screen: AppDrawerNavigatorCropSelection,
    navigationOptions: {
      headerShown: false
    }
  },
},
  {
    initialRouteName: 'Home1'
  }
);