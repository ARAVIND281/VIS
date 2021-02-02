import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import ChatClassStudent1 from '../teacherScreens/ChatClassStudent1';
import ChatClassStudent2 from '../teacherScreens/ChatClassStudent2';

export const chatWithClassStudents = createStackNavigator({
    ChatClassStudent1: {
    screen: ChatClassStudent1,
    navigationOptions: {
      headerShown: false
    }
  },
  ChatClassStudent2: {
    screen: ChatClassStudent2,
    navigationOptions: {
      headerShown: false
    }
  },
},
  {
    initialRouteName: 'ChatClassStudent1'
  }
);