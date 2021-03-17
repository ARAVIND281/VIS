import React from 'react';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import { AppDrawerNavigator } from './src/components/AppDrawerNavigator'
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import Home from "./src/screens/Home";

export default function App() {
  return (
    <AppContainer />
  );
}

const switchNavigator = createSwitchNavigator({
  LoginScreen: { screen: LoginScreen },
  SignupScreen: { screen: SignupScreen },
  AppDrawerNavigator: { screen: AppDrawerNavigator },
})

const AppContainer = createAppContainer(switchNavigator);