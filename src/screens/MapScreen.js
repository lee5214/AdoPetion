import React, { Component } from "react";import PropTypes from "prop-types";import { connect } from "react-redux";import { Animated, Dimensions, Easing, PanResponder, StyleSheet, Text, TouchableOpacity, View } from "react-native";import { CheckBox } from "react-native-elements";import * as actions from "../actions";import Icon from "react-native-vector-icons/MaterialIcons";import GeoFire from "geofire";import { firedb } from "../modules/firebase";import MapContainer from "../components/Map/MapContainer";import { defaultRegion } from "../../config/setting/defaultValues";import MapCarousel from "../components/Map/MapCarousel";const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");const CAROUSEL_HEIGHT = 200;const TAB_HEIGHT = 50;const CARD_MAX_Y = SCREEN_HEIGHT - CAROUSEL_HEIGHT - TAB_HEIGHT;class MapScreen extends Component {  // noinspection JSUnusedGlobalSymbols 1  static navigationOptions = {    title: "Map",    header: null,    tabBarIcon: ({ tintColor }) => {      return (        <Icon name="place" color={tintColor} size={20} type="materialicons" />      );    },    drawerLabel: "MapScreen"  };  constructor(props) {    super(props);    this.state = {      region: defaultRegion,      radius: 10,      dataLoading: false,      orgsSearchedID: [],      focusedOrgID: -1,      //these two only contain geo locations from firedb      geoMarkersCurrentSearchResults: {},      geoMarkersAllSearchResultsSaved: {},      petsForCarousel: [],      //animations      anime_carouselJumpUpValue: new Animated.Value(0),      anime_carouselSwipeValue: new Animated.ValueXY({        x: 0,        y: CARD_MAX_Y      })    };    this.anime_carouselJumpUp = Animated.timing(      this.state.anime_carouselJumpUpValue,      {        toValue: 1,        duration: 400,        easing: Easing.linear      }    );    //this._animation = new Animated.ValueXY({x:0,y:SCREEN_HEIGHT})    // this._animation = new Animated.Value(300);    // //get dynamic value of 'anime_carouselSwipeValue'    // this.state.anime_carouselSwipeValue.addListener(({ value }) => {    //   this._animation = value;    // });    this._panResponder = PanResponder.create({      onStartShouldSetPanResponder: () => true,      onMoveShouldSetPanResponder: (evt, gestureState) => {        //return true if user is swiping        if (Math.abs(gestureState.dx) < Math.abs(gestureState.dy * 5)) {          console.log("gesture swipe up");          return true;        }        return true;      },      // onPanResponderMove: Animated.event([      //   null,      //   {      //     dy: this._animation      //   }      // ]),      onPanResponderGrant: (evt, gestureState) => {        this.state.anime_carouselSwipeValue.extractOffset();      },      onPanResponderMove: (evt, gestureState) => {        this.state.anime_carouselSwipeValue.setValue({          x: 0,          y: gestureState.dy        });      },      onPanResponderRelease: (evt, gestureState) => {        //this.state.anime_carouselSwipeValue.y.setOffset( CARD_MAX_Y )        if (gestureState.dy < 0) {          Animated.spring(this.state.anime_carouselSwipeValue.y, {            toValue: -CARD_MAX_Y,            duration: 600,            tension: 1          }).start();        } else if (gestureState.dy >= 0) {          Animated.spring(this.state.anime_carouselSwipeValue.y, {            toValue: CARD_MAX_Y,            duration: 600,            tension: 1          }).start();        }        // console.log("gesture -- Release");        // if (gestureState.dy < -150) {        //   console.log("gesture.dy < -150");        //   this._animation.setOffset(0);        //   Animated.timing(this._animation, {        //     toValue: 0,        //     duration: 600        //   }).start();        //   //Animated.spring(this.state.anime_carouselSwipeValue)        // } else if (gestureState.dy > 150) {        //   console.log("gesture.dy>150");        //   Animated.timing(this._animation, {        //     toValue: 300,        //     duration: 600        //   }).start();        //   this._animation.setOffset(300);        // } else {        //   console.log("gesture.dy: none");        //   Animated.timing(this._animation, {        //     toValue: 300,        //     duration: 600        //   }).start();        //   this._animation.setOffset(300);        // }      }    });    this.markersHolder = {};    this.geoFire = new GeoFire(firedb.ref("orgs"));    this.geoQuery = this.geoFire.query({      center: [this.state.region.latitude, this.state.region.longitude],      radius: 10    });    this.geoQuery.on("ready", async () => {      this.setState({        geoMarkersCurrentSearchResults: this.markersHolder,        geoMarkersAllSearchResultsSaved: {          ...this.state.geoMarkersAllSearchResultsSaved,          ...this.markersHolder        },        dataLoading: false      });    });    this.geoQuery.on("key_entered", (key, location, distance) => {      this.setState({ dataLoading: true });      this.markersHolder[key] = { key, location, distance };    });    this.geoQuery.on("key_exited", key => {      this.setState({ dataLoading: true });      delete this.markersHolder[key];    });  }  _start_anime_carouselJumpUp = () => {    this.anime_carouselJumpUp.start(      this.state.anime_carouselJumpUpValue.setValue(0)    );  };  componentDidMount() {    navigator.geolocation.getCurrentPosition(pos => {      const longitude = pos.coords.longitude;      const latitude = pos.coords.latitude;      this.setState({ region: { ...this.state.region, latitude, longitude } });    });  }  static getDerivedStateFromProps(props, state) {    if (      props.orgsDetailList.newAdded &&      state.orgsSearchedID.indexOf(props.orgsDetailList.newAdded) < 0    ) {      return {        orgsSearchedID: [props.orgsDetailList.newAdded, ...state.orgsSearchedID]      };    }    if (props.petsByOrg.list[state.focusedOrgID]) {      let dataObj = props.petsByOrg.list[state.focusedOrgID];      let tempArr = Object.keys(dataObj).map(petID => dataObj[petID]);      return { petsForCarousel: tempArr };    }    // if (this.state.focusedOrgID && props.petsByOrg[this.state.focusedOrgID]!==this.state.petsForCarousel){    //   return {petsForCarousel:props.petsByOrg[this.state.focusedOrgID]}    // }    return null;  }  radiusFitScreen = (longitudeDelta, latitude) => {    let zoom = Math.round(Math.log(360 / longitudeDelta) / Math.LN2);    let sPerPx =      10 *      156543.03392 *      Math.cos(latitude * Math.PI / 180) /      Math.pow(2, zoom);    this.setState({ radius: sPerPx });  };  updateRegionInScreen = region => {    if (this.timerForMap) {      clearTimeout(this.timerForMap);    }    this.timerForMap = setTimeout(() => {      this.setState({ region });    }, 100);  };  onSearchArea = (lat, lng, rad) => {    this.updateCriteria(lat, lng, rad);  };  updateCriteria = (lat, lng, rad) => {    this.geoQuery.updateCriteria({      center: [lat, lng],      radius: rad    });  };  setLoadingFalse = () => {    this.setState({ dataLoading: false });  };  //for org  onPanItemPress = id => {    this.markAnimateToCoord(this.state.geoMarkersAllSearchResultsSaved[id]);    this.props.navigation.navigate("mapDetail", {      //TODO rewrite      focusedOrg: this.props.orgsDetailList.list[id]    });  };  markAnimateToCoord = markerData => {    let coordinate = {      latitude: markerData.location[0],      longitude: markerData.location[1]    };    this.mapContainer.map.animateToCoordinate(coordinate, 500);  };  onMapMarkPress = markerKey => {    this.setState({ focusedOrgID: markerKey, petsForCarousel: [] });    this._start_anime_carouselJumpUp();    this.props.fetchOrgDetail(markerKey);    this.props.fetchPetsByOrg(markerKey);  };  render() {    const scaleInterpolate = this.state.anime_carouselSwipeValue.y.interpolate({      inputRange: [0, CARD_MAX_Y],      outputRange: [200, 32],      extrapolate: "clamp"    });    // const { width, height: screenHeight } = Dimensions.get("window");    // const height = width * 0.5625;    // const opacityInterpolate = this._animation.interpolate({    //   inputRange: [0, 300],    //   outputRange: [1, 0]    // });    //    const translateYInterpolate = this.state.anime_carouselSwipeValue.y.interpolate(      {        inputRange: [0, CARD_MAX_Y],        outputRange: [-CARD_MAX_Y, 0],        extrapolate: "clamp"      }    );    const animatedCarouselTrans = {      transform: [        {          translateY: translateYInterpolate        }        // {        //   scale : scaleInterpolate        // }      ]    };    const animatedTitle = this.state.anime_carouselSwipeValue.y.interpolate({      inputRange: [0, CARD_MAX_Y],      outputRange: [0, 1],      extrapolate: "clamp"    });    //    // const scaleInterpolate = this.state.anime_carouselSwipeValue.y.interpolate({    //   inputRange: [0, 300],    //   outputRange: [0.9, 0.9],    //   extrapolate: "clamp"    // });    // const translateXInterpolate = this._animation.interpolate({    //   inputRange: [0, 300],    //   outputRange: [0, 85],    //   extrapolate: "clamp"    // });    const scrollStyles = {      //opacity: opacityInterpolate      transform: [        {          translateY: translateYInterpolate        }      ]    };    const carouselJumpUp = this.state.anime_carouselJumpUpValue.interpolate({      inputRange: [0, 1],      outputRange: [SCREEN_HEIGHT, CARD_MAX_Y]      //outputRange: [-300, 0]    });    const { orgsDetailList, petsByOrg } = this.props;    const focusedOrg = orgsDetailList[this.state.focusedOrgID];    // const data= this.props.petsByOrg[this.state.focusedOrgID]    // const carouselData = Object.keys(data).map(id=>data[id])||[]    // console.log('carouselData',carouselData)    const {      latitude,      longitude,      latitudeDelta,      longitudeDelta    } = this.state.region;    return (      <View style={styles.container}>        {/*<ModalContainer*/}        {/*visible={this.state.dataLoading}*/}        {/*setLoadingFalse={this.setLoadingFalse}*/}        {/*/>*/}        <MapContainer          ref={ref => (this.mapContainer = ref)}          dataLoading={this.state.dataLoading}          geoMarkersCurrentSearchResults={            this.state.geoMarkersCurrentSearchResults          }          updateRegionInScreen={this.updateRegionInScreen}          onRegionChangeComplete={this.onRegionChangeComplete}          radius={this.state.radius}          orgsDetailList={this.props.orgsDetailList}          navigation={this.props.navigation}          onMapMarkPress={this.onMapMarkPress}        >          <View            style={{              position: "absolute",              flexDirection: "row",              width: 150,              left: (SCREEN_WIDTH - 150) / 2,              height: 50,              top: (SCREEN_HEIGHT - 50) / 2 + 75,              //opacity: 0.4,              //backgroundColor: "red",              //borderRadius: 25,              zIndex: 10            }}          >            <View style={{ flex: 1 }}>              <CheckBox                size={20}                center                containerStyle={{ padding: 10 }}                checkedIcon="dot-circle-o"                uncheckedIcon="circle-o"                uncheckedColor="white"                checkedColor="purple"                onPress={() => this.setState({ radius: 10 })}                checked={this.state.radius === 10}              />            </View>            <TouchableOpacity              style={{                flex: 1,                width: 50,                height: 50,                backgroundColor: "white",                borderRadius: 25              }}              onPress={() =>                this.onSearchArea(latitude, longitude, this.state.radius)              }            >              <Icon                name="location-searching"                size={40}                style={{ margin: 5 }}                type="materialicons"              />            </TouchableOpacity>            <View style={{ flex: 1 }}>              <CheckBox                size={30}                center                containerStyle={{ padding: 5 }}                checkedIcon="dot-circle-o"                uncheckedIcon="circle-o"                uncheckedColor="white"                checkedColor="purple"                onPress={() => this.setState({ radius: 50 })}                checked={this.state.radius === 50}              />            </View>          </View>        </MapContainer>        {/*burger button*/}        <View style={{ position: "absolute", top: 40, flexDirection: "row" }}>          <Icon            style={{ position: "absolute", right: 25 }}            name="menu"            color={"white"}            size={30}            type="materialicons"            onPress={() => {              this.props.navigation.navigate("DrawerOpen");            }}          />          <View style={{ flexGrow: 1 }}>            <Text style={{ textAlign: "center", color: "white" }}>              LatLng:{latitude.toFixed(2)}|{longitude.toFixed(2)}            </Text>            <Text style={{ textAlign: "center", color: "white" }}>              Delta:{latitudeDelta.toFixed(2)}|{longitudeDelta.toFixed(2)}            </Text>          </View>        </View>        <Animated.View          style={[            {              position: "absolute",              borderRadius: 25,              top: carouselJumpUp,              height: CAROUSEL_HEIGHT,              width: "100%",              backgroundColor:'pink'            },            //videoStyles,            animatedCarouselTrans          ]}          {...this._panResponder.panHandlers}        >          {/*<Animated.Text*/}            {/*style={[{ color: "white" }, { opacity: animatedTitle }]}*/}          {/*>*/}            {/*Ttitle!!!!*/}          {/*</Animated.Text>*/}          <MapCarousel            itemType={"pets"}            focusedOrgID={this.state.focusedOrgID}            orgsDetailList={orgsDetailList}            //petsByOrg={petsByOrg}            //orgsSearchedID={this.state.orgsSearchedID} //all searched orgs ID            //carouselData={carouselData} //for orgs data?            petsForCarousel={this.state.petsForCarousel}            onPanItemPress={this.onPanItemPress}          />        </Animated.View>        {/*<Animated.ScrollView style={[{height:60,width:'100%',position:'absolute',backgroundColor:'red',bottom:0}]}>*/}            {/*<Text>TEST</Text>*/}        {/*</Animated.ScrollView>*/}      </View>    );  }}const styles = StyleSheet.create({  container: {    flex: 1    //justifyContent: "center"  },  panContainer: {    flexDirection: "column",    //width: 200,    left: 0, //(SCREEN_WIDTH - 200)/2,    top: 100,    zIndex: 1,    position: "absolute",    backgroundColor: "white"  },  centerPointer: {    flexDirection: "column",    width: 200,    height: 100,    opacity: 1,    backgroundColor: "white",    borderRadius: 25,    zIndex: 10  }});function mapStateToProps(state) {  return {    jobsList: state.jobsList.results,    petsByOrg: state.petsByOrg,    orgsDetailList: state.orgsDetailList  };}MapScreen.propTypes = {  jobsList: PropTypes.array.isRequired};MapScreen.defaultProps = {  jobsList: [],  petsByOrg: {},  orgsDetailList: {    //newAdded:null,    list: {}  }};export default connect(mapStateToProps, actions)(MapScreen);