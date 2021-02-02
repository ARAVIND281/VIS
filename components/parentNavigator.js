import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import parentScreen from '../studentScreens/parentScreen';
import parentScreen1 from '../studentScreens/parentScreen1';

export const parentNavigator = createStackNavigator({
    parentScreen: {
        screen: parentScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    parentScreen1: {
        screen: parentScreen1,
        navigationOptions: {
            headerShown: false
        }
    },
},
    {
        initialRouteName: 'parentScreen'
    }
);