import React from "react";import { DrawerNavigator, StackNavigator, TabNavigator } from "react-navigation";import ReviewScreen from "../screens/ReviewScreen";import DeckScreen from "../screens/DeckScreen";import SettingScreen from "../screens/SettingScreen";import AuthScreen from "../screens/AuthScreen";import MapScreen from "../screens/MapScreen";import WelcomeScreen from "../screens/WelcomeScreen";import SignupScreen from "../screens/SignupScreen";import TestScreen from "../screens/TestScreen";import MapDrawer from "../screens/MapDrawer";const ReviewNavigator = StackNavigator({  review: { screen: ReviewScreen },  setting: { screen: SettingScreen }});const AuthNavigator = StackNavigator({  auth: { screen: AuthScreen },  signup: { screen: SignupScreen }});const MapNavigator = DrawerNavigator(  {    mapMain: { screen: MapScreen },    mapDrawer: { screen: MapDrawer }  },  {    drawerPosition: "right",    drawerWidth: 200,    drawerOpenRoute: "DrawerOpen",    drawerCloseRoute: "DrawerClose",    drawerToggleRoute: "DrawerToggle"  });const MainNavigator = TabNavigator(  {    map: { screen: MapNavigator },    deck: { screen: DeckScreen },    review: ReviewNavigator,    test: { screen: TestScreen }  },  {    tabBarOptions: {      labelStyle: { fontSize: 10 },      activeTintColor: "tomato",      inactiveTintColor: "gray",      style: { height: 50 }    }  });export default TabNavigator(  {    welcome: { screen: WelcomeScreen },    auth: { screen: AuthNavigator },    main: {      screen: MainNavigator,      tabBarOptions: {        labelStyle: { fontSize: 14 }      }    }  },  {    navigationOptions: {      tabBarVisible: false    },    lazy: true  });