import React from "react";import { DrawerNavigator, StackNavigator, TabNavigator } from "react-navigation";import ReviewScreen from "../screens/ReviewScreen";import DeckScreen from "../screens/DeckScreen";import SettingScreen from "../screens/SettingScreen";import AuthScreen from "../screens/AuthScreen";import MapScreen from "../screens/MapScreen";import WelcomeScreen from "../screens/WelcomeScreen";import SignupScreen from "../screens/SignupScreen";import TestScreen from "../screens/TestScreen";import MapDrawer from "../screens/MapDrawer";import MapDetail from '../screens/MapDetail';const ReviewNavigator = StackNavigator({  review: { screen: ReviewScreen },  setting: { screen: SettingScreen }});const AuthNavigator = StackNavigator({  auth: { screen: AuthScreen },  signup: { screen: SignupScreen }});const MapContainer = StackNavigator({  mapContainer:{screen:MapScreen},  mapDetail:{screen:MapDetail}})const MapNavigator = DrawerNavigator(  {    mapMain: { screen: MapContainer },    mapDrawer: { screen: MapDrawer }  },  {    drawerPosition: "left",    drawerWidth: 200,    drawerOpenRoute: 'DrawerOpen',    drawerCloseRoute: 'DrawerClose',    drawerToggleRoute: 'DrawerToggle',  });const MainNavigator = TabNavigator(  {    map: { screen: MapNavigator },    deck: { screen: DeckScreen },    review: ReviewNavigator,    test: { screen: TestScreen }  },  {    tabBarOptions: {      labelStyle: { fontSize: 10 },      activeTintColor: "tomato",      inactiveTintColor: "gray"    }  });export default TabNavigator(  {    welcome: { screen: WelcomeScreen },    auth: { screen: AuthNavigator },    main: {      screen: MainNavigator,      tabBarOptions: {        labelStyle: { fontSize: 14 }      }    }  },  {    navigationOptions: {      tabBarVisible: false    },    lazy: true  });