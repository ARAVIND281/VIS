import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import ClassUpdate1 from '../teacherScreens/ClassUpdate1';
import ClassUpdate2 from '../teacherScreens/ClassUpdate2';

export const ClassUpdate = createStackNavigator({
    ClassUpdate1: {
    screen: ClassUpdate1,
    navigationOptions: {
      headerShown: false
    }
  },
  ClassUpdate2: {
    screen: ClassUpdate2,
    navigationOptions: {
      headerShown: false
    }
  }
},
  {
    initialRouteName: 'ClassUpdate1'
  }
);