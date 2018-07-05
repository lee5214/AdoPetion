import React, { Component } from "react";import { Animated, Dimensions, Easing } from "react-native";import { createStackNavigator } from "react-navigation";import MapScreen from "./MapScreen";import MapOrgDetail from "./MapOrgDetail";import Icon from "react-native-vector-icons/MaterialIcons";import _ from "lodash";import MapPetDetail from "./MapPetDetail";import { BlurView } from "expo";const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);const { width: SCREEN_WIDTH } = Dimensions.get("window");class MapWrapper extends Component {  constructor(props) {    super(props);    this.state = {      drawerOpen: false,      anime_drawerOpen: new Animated.Value(0)    };    this.anime_drawerOpen = Animated.timing(this.state.anime_drawerOpen, {      toValue: 300,      duration: 300,      easing: Easing.linear    });    this.anime_drawerOpen2 = Animated.timing(this.state.anime_drawerOpen, {      toValue: 0,      duration: 300,      easing: Easing.linear    });  }  static navigationOptions = {    drawerLockMode: "locked-closed",    header: null  };  static getDerivedStateFromProps(props, state) {    if (_.get(props, "navigation.state.params.from") === "mapWrapper") {      console.log("wrapper drawer close");      return { drawerOpen: false };    }    return null;  }  componentDidUpdate(prevProps, prevState) {    if (this.state.drawerOpen === true && this.state.drawerOpen !== prevState.drawerOpen) {      this.props.navigation.openDrawer();      this.anime_drawerOpen.start(this.state.anime_drawerOpen.setValue(0));    }    if (this.state.drawerOpen === false && this.state.drawerOpen !== prevState.drawerOpen) {      this.props.navigation.closeDrawer();      this.anime_drawerOpen2.start(this.state.anime_drawerOpen.setValue(300));    }  }  openDrawer = () => {    this.setState({ drawerOpen: true });  };  render() {    const Map = createStackNavigator({      mapScreen: {        screen: MapScreen,        navigationOptions: {          //header: null,          headerTransparent: true,          //headerStyle: { borderBottomWidth: 0 },          headerLeft: (            <Icon              name="menu"              size={30}              color={"white"}              type="materialicons"              style={{ paddingLeft: 20 }}              onPress={() => {                this.setState({ drawerOpen: true });                this.props.navigation.openDrawer();              }}            />          ),          tabBarIcon: ({ tintColor }) => {            return <Icon name="favorite-border" color={tintColor} size={20} type="materialicons" />;          }        }      },      mapPetDetail: {screen: MapPetDetail,},      mapOrgDetail:{screen:MapOrgDetail}    });    const drawerScale = this.state.anime_drawerOpen.interpolate({      inputRange: [0, 300],      outputRange: [1, 0.7],      extrapolate: "clamp"    });    const drawerLeft = this.state.anime_drawerOpen.interpolate({      inputRange: [0, 300],      outputRange: [0, SCREEN_WIDTH * 0.7],      extrapolate: "clamp"    });    const drawerBlur = this.state.anime_drawerOpen.interpolate({      inputRange: [0, 300],      outputRange: [0, 80],      extrapolate: "clamp"    });    return (      <Animated.View style={{ flex: 1, transform: [{ scale: drawerScale }, { translateX: drawerLeft}] }}>        <Map />        {/*<AnimatedBlurView          tint="default"          intensity={this.state.drawerOpen ? 60 : 0}          style={[StyleSheet.absoluteFill, { display: this.state.drawerOpen ? "flex" : "none" }]}        />*/}      </Animated.View>    );  }}export default MapWrapper;