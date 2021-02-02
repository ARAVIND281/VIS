import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Image } from 'react-native';
import sideBarteacher from './sideBarteacher';
import hodHome from '../teacherScreens/hodHome';
import { Icon } from 'react-native-elements';
import teacherProfile from '../teacherScreens/teacherProfile';
import { updateReportasClass } from './AppStackClassTeacherNavigator';
import { RFValue } from 'react-native-responsive-fontsize';
import { updateReportasSubject } from './AppStackSubjectTeacherNavigator';
import { ClassUpdate } from './AppStackNavigatorTrclassUpdate';
import { chatWithClassStudents } from './AppStackChatTeacherNavigator'
import FeedBackScreen from '../screens/FeedBackScreen';
import createClass from '../teacherScreens/createClass'
import { AttendanceNavigator } from './AttendanceNavigator'
import { AttendanceNavigator2 } from './AttendanceNavigator2';
import Announcements from '../teacherScreens/Announcement'
import ChatTeacher from '../teacherScreens/ChatTeacher';
import ccaAnnouncement from '../teacherScreens/ccaAnnouncement';
import addPoint from '../teacherScreens/addPoint';

export const AppDrawerNavigatorhod = createDrawerNavigator({
  hodHome: {
    screen: hodHome,
    navigationOptions: {
      drawerIcon: <Icon name="home" type="font-awesome-5" size={RFValue(20)} />,
      drawerLabel: "Dashboard"
    }
  },
  ReportCardClass: {
    screen: updateReportasClass,
    navigationOptions: {
      drawerIcon: <Icon name="id-card" type="font-awesome-5" size={RFValue(20)} />,
      drawerLabel: "Update Report as\nclass teacher"
    }
  },
  ReportCardSubject: {
    screen: updateReportasSubject,
    navigationOptions: {
      drawerIcon: <Icon name="id-card" type="font-awesome-5" size={RFValue(20)} />,
      drawerLabel: "Update Report as\nSubject teacher"
    }
  },
  ClassUpdate: {
    screen: ClassUpdate,
    navigationOptions: {
      drawerIcon: <Icon name="sync" type="font-awesome-5" size={RFValue(22)} />,
      drawerLabel: "Class Update"
    }
  },
  Announcements: {
    screen: Announcements,
    navigationOptions: {
      drawerIcon: <Image
        source={require('../assets/announcements.png')}
        style={{ height: RFValue(30), width: RFValue(30) }}
      />,
      drawerLabel: "Announcements"
    }
  },
  ccaAnnouncement: {
    screen: ccaAnnouncement,
    navigationOptions: {
      drawerIcon: <Image
        source={require('../assets/announcements.png')}
        style={{ height: RFValue(30), width: RFValue(30) }}
      />,
      drawerLabel: "CCA Announcements"
    }
  },
  chatWithClassStudents: {
    screen: chatWithClassStudents,
    navigationOptions: {
      drawerIcon: <Icon name="comments" type="font-awesome-5" size={RFValue(20)} />,
      drawerLabel: "Talk With Class\nStudents"
    }
  },
  ChatTeacher: {
    screen: ChatTeacher,
    navigationOptions: {
      drawerIcon: <Icon name="comments" type="font-awesome-5" size={RFValue(20)} />,
      drawerLabel: "Talk With Teachers"
    }
  },
  addPoint: {
    screen: addPoint,
    navigationOptions: {
      drawerIcon: <Icon name="gifts" type="font-awesome-5" size={RFValue(20)} />,
      drawerLabel: "Add points to \nClass Students"
    }
  },
  teacherProfile: {
    screen: teacherProfile,
    navigationOptions: {
      drawerIcon: <Icon name="user-circle" type="font-awesome-5" size={RFValue(25)} />,
      drawerLabel: "Profile"
    }
  },
  createClass: {
    screen: createClass,
    navigationOptions: {
      drawerIcon: <Icon name="calendar-alt" type="font-awesome-5" size={RFValue(25)} />,
      drawerLabel: "Schedule Class"
    }
  },
  AttendanceNavigator: {
    screen: AttendanceNavigator,
    navigationOptions: {
      drawerIcon: <Image
        source={require('../assets/attendance.jpg')}
        style={{ height: RFValue(30), width: RFValue(30) }}
      />,
      drawerLabel: "Class Students\nAttendance"
    }
  },
  AttendanceNavigator2: {
    screen: AttendanceNavigator2,
    navigationOptions: {
      drawerIcon: <Image
        source={require('../assets/attendance.jpg')}
        style={{ height: RFValue(30), width: RFValue(30) }}
      />,
      drawerLabel: "Subject Students\nAttendance"
    }
  },
  FeedBackScreen: {
    screen: FeedBackScreen,
    navigationOptions: {
      drawerIcon: <Icon name="comment-dots" type="font-awesome-5" size={RFValue(23)} />,
      drawerLabel: "Feed Back"
    }
  },
},
  {
    contentComponent: sideBarteacher
  },
  {
    initialRouteName: 'hodHome'
  })