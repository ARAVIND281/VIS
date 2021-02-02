import React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideBar from './SideBar';
import { AppStackStHomeNavigator } from './AppStackStHomeNavigator';
import { Icon } from 'react-native-elements';
import Profile from '../studentScreens/ProfileScreen';
import ReportCard from '../studentScreens/ReportCard'
import { RFValue } from 'react-native-responsive-fontsize';
import { LeaderBoard } from './AppStackNavigatorLeaderBoard';
import ClassUpdate from '../studentScreens/ClassUpdate';
import ChatClassTeacher from '../studentScreens/ChatClassTeacher';
import FeedBackScreen from '../screens/FeedBackScreen';
import TalkToAo from '../studentScreens/TalkToAo';
import joinClass from '../studentScreens/joinClass'
import { parentNavigator } from './parentNavigator';
import AnnouncementSt from '../studentScreens/AnnouncementSt'
import ccaAnnouncement from '../studentScreens/ccaAnnouncement';

export const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AppStackStHomeNavigator,
    navigationOptions: {
      drawerIcon: <Icon name="home" type="font-awesome-5" size={RFValue(22)} />,
      drawerLabel: "Dashboard"
    }
  },
  ReportCard: {
    screen: ReportCard,
    navigationOptions: {
      drawerIcon: <Icon name="id-card" type="font-awesome-5" size={RFValue(21)} />,
      drawerLabel: "Report Card"
    }
  },
  LeaderBoard: {
    screen: LeaderBoard,
    navigationOptions: {
      drawerIcon: <Icon name="award" type="font-awesome-5" />,
      drawerLabel: "Leader Board"
    }
  },
  parentNavigator: {
    screen: parentNavigator,
    navigationOptions: {
      drawerIcon: <Image
        source={require('../assets/Parent_Login.png')}
        style={{ height: RFValue(30), width: RFValue(30) }}
      />,
      drawerLabel: "Parent Corner"
    }
  },
  AnnouncementSt: {
    screen: AnnouncementSt,
    navigationOptions: {
      drawerIcon: <Image
        source={require('../assets/announcements.png')}
        style={{ height: RFValue(30), width: RFValue(30) }}
      />,
      drawerLabel: "Announcements"
    }
  },
  ccaAnnouncementst: {
    screen: ccaAnnouncement,
    navigationOptions: {
      drawerIcon: <Image
        source={require('../assets/announcements.png')}
        style={{ height: RFValue(30), width: RFValue(30) }}
      />,
      drawerLabel: "CCA Announcements"
    }
  },
  ChatClassTeacher: {
    screen: ChatClassTeacher,
    navigationOptions: {
      drawerIcon: <Icon name="comments" type="font-awesome-5" size={RFValue(22)} />,
      drawerLabel: "Talk with Class Teacher"
    }
  },
  ClassUpdate: {
    screen: ClassUpdate,
    navigationOptions: {
      drawerIcon: <Icon name="sync" type="font-awesome-5" size={RFValue(22)} />,
      drawerLabel: "Class Update"
    }
  },
  joinClass: {
    screen: joinClass,
    navigationOptions: {
      drawerIcon: <Image
        source={require('../assets/join2.png')}
        style={{ height: RFValue(30), width: RFValue(30) }}
      />,
      drawerLabel: "Join Class"
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      drawerIcon: <Icon name="user-circle" type="font-awesome" />,
      drawerLabel: "Profile"
    }
  },
  FeedBackScreen: {
    screen: FeedBackScreen,
    navigationOptions: {
      drawerIcon: <Icon name="comment-dots" type="font-awesome-5" />,
      drawerLabel: "Feed Back"
    }
  },
  TalkToAo: {
    screen: TalkToAo,
    navigationOptions: {
      drawerIcon: <Icon name="exclamation-circle" type="font-awesome-5" />,
      drawerLabel: "Unresolved Issues"
    }
  },
},
  {
    contentComponent: SideBar
  },
  {
    initialRouteName: 'Home'
  })