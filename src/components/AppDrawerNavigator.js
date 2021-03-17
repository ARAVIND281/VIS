import React from 'react';
import { Image, View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideBar from './SideBar';
import { Icon, Text } from 'react-native-elements';
import Home from '../screens/HomeScreen'
import Home1 from '../screens/Home'
import CropSelection1 from '../screens/CropSelection1'
import ProfileScreen from "../screens/ProfileScreen";
import { AppStackNavigator } from "./AppStackNavigator";
import { AppDrawerNavigatorCropSelection } from "./AppDrawerNavigatorCropSelection"

export const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AppStackNavigator,
    navigationOptions: {
      drawerIcon:
        <View style={{
          height: 50,
          flexDirection: "row",
          paddingLeft: 70,
          alignItems: "center",
        }} >
          <Icon
            reverse
            name="home"
            type="font-awesome-5"
            color='#26B0A2'
            size={18}
          />
        </View>,
      drawerLabel: <Text style={{
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 35
      }}>Home</Text>
    }
  },
  CropTreatment: {
    screen: Home,
    navigationOptions: {
      drawerIcon:
        <View style={{
          height: 50,
          flexDirection: "row",
          paddingLeft: 70,
          alignItems: "center",
          marginTop: 10
        }} >
          <Icon
            reverse
            name="leaf"
            type="font-awesome-5"
            color='#F25331'
            size={18}
          />
        </View>,
      drawerLabel: <Text style={{
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 35,
        marginTop: 10
      }}>Crop Treatment</Text>
    }
  },
  CropSelection: {
    screen: AppDrawerNavigatorCropSelection,
    navigationOptions: {
      drawerIcon:
        <View style={{
          height: 50,
          flexDirection: "row",
          paddingLeft: 70,
          alignItems: "center",
          marginTop: 10
        }} >
          <Icon
            reverse
            name="seedling"
            type="font-awesome-5"
            color='#FEBF2E'
            size={18}
          />
        </View>,
      drawerLabel: <Text style={{
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 35,
        marginTop: 10
      }}>Crop Selection</Text>
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerIcon:
        <View style={{
          height: 50,
          flexDirection: "row",
          paddingLeft: 70,
          alignItems: "center",
          marginTop: 10
        }} >
          <Icon
            reverse
            name="user"
            type="font-awesome-5"
            color='#F57F9A'
            size={18}
          />
        </View>,
      drawerLabel: <Text style={{
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 35,
        marginTop: 10
      }}>Profile</Text>
    }
  },
},
  {
    contentComponent: SideBar
  },
  {
    initialRouteName: 'Home'
  })