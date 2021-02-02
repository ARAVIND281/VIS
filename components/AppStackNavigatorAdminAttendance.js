import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import attendanceAdmin1 from '../admin/attendanceAdmin1';
import attendanceAdmin2 from '../admin/attendanceAdmin2';
import attendanceAdmin3 from '../admin/attendanceAdmin3';

export const attendanceAdmin = createStackNavigator({
    attendanceAdmin1: {
    screen: attendanceAdmin1,
    navigationOptions: {
      headerShown: false
    }
  },
  attendanceAdmin2: {
    screen: attendanceAdmin2,
    navigationOptions: {
      headerShown: false
    }
  },
  attendanceAdmin3: {
    screen: attendanceAdmin3,
    navigationOptions: {
      headerShown: false
    }
  },
},
  {
    initialRouteName: 'attendanceAdmin1'
  }
);