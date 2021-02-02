import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import attendance1 from '../teacherScreens/attendance1';
import attendance2 from '../teacherScreens/attendance2';
import attendance3 from '../teacherScreens/attendance3';

export const AttendanceNavigator = createStackNavigator({
  attendance1: {
    screen: attendance1,
    navigationOptions: {
      headerShown: false
    }
  },
  attendance2: {
    screen: attendance2,
    navigationOptions: {
      headerShown: false
    }
  },
  attendance3: {
    screen: attendance3,
    navigationOptions: {
      headerShown: false
    }
  },
},
  {
    initialRouteName: 'attendance1'
  }
);