import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import updateReportasSubject1 from '../teacherScreens/updateReportasSubject1';
import updateReportasSubject2 from '../teacherScreens/updateReportasSubject2';
import updateReportasSubject3 from '../teacherScreens/updateReportasSubject3';
import updateReportasSubject4 from '../teacherScreens/updateReportasSubject4';

export const updateReportasSubject = createStackNavigator({
    updateReportasSubject1: {
    screen: updateReportasSubject1,
    navigationOptions: {
      headerShown: false
    }
  },
  updateReportasSubject2: {
    screen: updateReportasSubject2,
    navigationOptions: {
      headerShown: false
    }
  },
  updateReportasSubject3: {
    screen: updateReportasSubject3,
    navigationOptions: {
      headerShown: false
    }
  },
  updateReportasSubject4: {
    screen: updateReportasSubject4,
    navigationOptions: {
      headerShown: false
    }
  },
},
  {
    initialRouteName: 'updateReportasSubject1'
  }
);