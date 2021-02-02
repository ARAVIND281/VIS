import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import updateReportasClass1 from '../teacherScreens/updateReportasClass1';
import updateReportasClass2 from '../teacherScreens/updateReportasClass2';

export const updateReportasClass = createStackNavigator({
    updateReportasClass1: {
    screen: updateReportasClass1,
    navigationOptions: {
      headerShown: false
    }
  },
  updateReportasClass2: {
    screen: updateReportasClass2,
    navigationOptions: {
      headerShown: false
    }
  }
},
  {
    initialRouteName: 'updateReportasClass1'
  }
);