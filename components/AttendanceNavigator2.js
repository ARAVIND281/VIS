import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import attendanceSu from '../teacherScreens/attendanceSu';
import attendanceSu1 from '../teacherScreens/attendanceSu1';
import attendance2 from '../teacherScreens/attendance2';

export const AttendanceNavigator2 = createStackNavigator({
    attendanceSu: {
        screen: attendanceSu,
        navigationOptions: {
            headerShown: false
        }
    },
    attendanceSu1: {
        screen: attendanceSu1,
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
},
    {
        initialRouteName: 'attendanceSu'
    }
);