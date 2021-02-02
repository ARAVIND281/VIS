import React from 'react';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
//import LoginScreen from './screens/LoginScreen';
//import { AppDrawerNavigator } from './components/AppDrawerNavigator';
//import { AppDrawerNavigatorTeacher } from './components/AppDrawerNavigatorTeacher';
//import { AppDrawerNavigatorhod } from './components/AppDrawerNavigatorhod';
import AddStudent from './screens/addStudent'
//import {AppDrawerNavigatorAdmin} from './components/AppDrawerNavigatorAdmin'

export default function App() {
  return (
    <AppContainer />
  );
}

const switchNavigator = createSwitchNavigator({
  AddStudent: { screen: AddStudent },
  //LoginScreen: { screen: LoginScreen },
  //AppDrawerNavigatorTeacher: { screen: AppDrawerNavigatorTeacher },
  //AppDrawerNavigatorhod: { screen: AppDrawerNavigatorhod },
  //Drawer: { screen: AppDrawerNavigator },
  //AppDrawerNavigatorAdmin: { screen: AppDrawerNavigatorAdmin },
})

const AppContainer = createAppContainer(switchNavigator);