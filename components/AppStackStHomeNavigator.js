import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../studentScreens/Home';
import Quize from '../quizComponents/MainQuiz';

export const AppStackStHomeNavigator = createStackNavigator({
    Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    }
  },
  Quize: {
    screen: Quize,
    navigationOptions: {
      headerShown: false
    }
  }
},
  {
    initialRouteName: 'Home'
  }
);