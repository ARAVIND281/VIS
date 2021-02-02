import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import updateReportasSubject1 from '../admin/updateReportAdmin1';
import updateReportasSubject2 from '../admin/updateReportAdmin2';
import updateReportasSubject3 from '../admin/updateReportAdmin3';
import updateReportasSubject4 from '../admin/updateReportAdmin4';

export const AppStackAdminReportNavigator = createStackNavigator({
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