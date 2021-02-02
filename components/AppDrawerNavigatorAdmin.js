import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import sideBarAdmin from './sideBarAdmin';
import { Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppStackNavigatorAdminFeedBack } from './AppStackNavigatorAdminFeedBack';
import achievement from '../admin/achievement';
import addStudent from '../screens/addStudent';
import addTeacher from '../screens/addTeacher'
import { attendanceAdmin } from './AppStackNavigatorAdminAttendance'
import { Image } from 'react-native';
import classes from '../admin/createClassAdmin';
import joinClassAdmin from '../admin/joinClassAdmin'
import {AppStackAdminReportNavigator} from './AppStackAdminReportNavigator'
import profileAdmin from '../admin/profileAdmin';

export const AppDrawerNavigatorAdmin = createDrawerNavigator({
  FeedBackAdmin: {
    screen: AppStackNavigatorAdminFeedBack,
    navigationOptions: {
      drawerIcon: <Icon name="comment-dots" type="font-awesome-5" size={RFValue(23)} />,
      drawerLabel: "Feed Back"
    }
  },
  achievement: {
    screen: achievement,
    navigationOptions: {
      drawerIcon: <Icon name="trophy" type="font-awesome-5" size={RFValue(21)} />,
      drawerLabel: "Achievement"
    }
  },
  addStudent: {
    screen: addStudent,
    navigationOptions: {
      drawerIcon: <Icon name="user-plus" type="font-awesome-5" size={RFValue(20)} />,
      drawerLabel: "Add Student"
    }
  },
  addTeacher: {
    screen: addTeacher,
    navigationOptions: {
      drawerIcon: <Icon name="user-plus" type="font-awesome-5" size={RFValue(20)} />,
      drawerLabel: "Add Teacher"
    }
  },
  attendanceAdmin: {
    screen: attendanceAdmin,
    navigationOptions: {
      drawerIcon: <Image
        source={require('../assets/attendance.jpg')}
        style={{ height: RFValue(30), width: RFValue(30) }}
      />,
      drawerLabel: "Attendance"
    }
  },
  classes: {
    screen: classes,
    navigationOptions: {
      drawerIcon: <Icon name="calendar-alt" type="font-awesome-5" size={RFValue(25)} />,
      drawerLabel: "Schedule Class"
    }
  },
  joinClassAdmin: {
    screen: joinClassAdmin,
    navigationOptions: {
      drawerIcon: <Image
        source={require('../assets/join2.png')}
        style={{ height: RFValue(30), width: RFValue(30) }}
      />,
      drawerLabel: "Join Class"
    }
  },
  AppStackAdminReportNavigator: {
    screen: AppStackAdminReportNavigator,
    navigationOptions: {
      drawerIcon: <Icon name="id-card" type="font-awesome-5" size={RFValue(20)} />,
      drawerLabel: "Update Report"
    }
  },
  profileAdmin: {
    screen: profileAdmin,
    navigationOptions: {
      drawerIcon: <Icon name="user-circle" type="font-awesome" />,
      drawerLabel: "Profile"
    }
  },

},
  {
    contentComponent: sideBarAdmin
  },
  {
    initialRouteName: 'FeedBackAdmin'
  })