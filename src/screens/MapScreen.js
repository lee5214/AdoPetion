import React, { Component } from "react";import PropTypes from "prop-types";import { connect } from "react-redux";import { ScrollView, StyleSheet, Text, View } from "react-native";import { Button } from "react-native-elements";import * as actions from "../actions";import Icon from "react-native-vector-icons/MaterialIcons";import GeoFire from "geofire";import { firedb } from "../modules/firebase";import MapContainer from "../components/Map/MapContainer";import ModalContainer from "../components/Map/ModalContainer";import { defaultRegion } from "../../config/setting/defaultValues";class MapScreen extends Component {  // noinspection JSUnusedGlobalSymbols 1  static navigationOptions = {    title: "Map",    header:null,    tabBarIcon: ({ tintColor }) => {      return (        <Icon name="place" color={tintColor} size={20} type="materialicons" />      );    },    drawerLabel: "MapScreen"  };  constructor(props) {    super(props);    this.state = {      region: defaultRegion,      dataLoading: false,      radius: 10,      markersSearchResults: {},      markersSearchResultsSaved: {}    };    this.markersHolder = {};    this.geoFire = new GeoFire(firedb.ref("orgs"));    this.geoQuery = this.geoFire.query({      center: [this.state.region.latitude, this.state.region.longitude],      radius: 10    });    this.geoQuery.on("ready", async () => {      this.setState({        markersSearchResults: this.markersHolder,        markersSearchResultsSaved: {          ...this.state.markersSearchResultsSaved,          ...this.markersHolder        },        dataLoading: false      });    });    this.geoQuery.on("key_entered", (key, location, distance) => {      this.setState({ dataLoading: true });      this.markersHolder[key] = { key, location, distance };    });    this.geoQuery.on("key_exited", key => {      this.setState({ dataLoading: true });      delete this.markersHolder[key];    });  }  componentDidMount() {    navigator.geolocation.getCurrentPosition(pos => {      const longitude = pos.coords.longitude;      const latitude = pos.coords.latitude;      this.setState({ region: { ...this.state.region, latitude, longitude } });    });  }  radiusFitScreen = (longitudeDelta, latitude) => {    let zoom = Math.round(Math.log(360 / longitudeDelta) / Math.LN2);    let sPerPx =      10 *      156543.03392 *      Math.cos(latitude * Math.PI / 180) /      Math.pow(2, zoom);    this.setState({ radius: sPerPx });  };  updateRegionInScreen = region => {    if (this.timerForMap) {      clearTimeout(this.timerForMap);    }    this.timerForMap = setTimeout(() => {      this.setState({ region });    }, 100);  };  onSearchArea = (lat, lng, rad) => {    this.updateCriteria(lat, lng, rad);  };  updateCriteria = (lat, lng, rad) => {    this.geoQuery.updateCriteria({      center: [lat, lng],      radius: rad    });  };  changeRadius10 = () => {    this.setState(      { radius: 10 },      this.geoQuery.updateCriteria({        radius: this.state.radius      })    );  };  changeRadius50 = () => {    this.setState(      { radius: 50 },      this.geoQuery.updateCriteria({        radius: this.state.radius      })    );  };  setLoadingFalse = () => {    this.setState({ dataLoading: false });  };  onPanItemPress = id => {    let marker = this.state.markersSearchResultsSaved[id];    this.animateToCoordFromParent(marker);    this.props.fetchPetsByOrg(id)    this.props.navigation.navigate('mapDetail')  };  animateToCoordFromParent = markerData => {    let coordinate = {      latitude: markerData.location[0],      longitude: markerData.location[1]    };    this.mapContainer.map.animateToCoordinate(coordinate, 500);  };  render() {    const { orgsDetailList } = this.props;    let {      latitude,      longitude,      latitudeDelta,      longitudeDelta    } = this.state.region;    return (      <View style={styles.container}>        <ModalContainer          visible={this.state.dataLoading}          setLoadingFalse={this.setLoadingFalse}        />        <MapContainer          ref={ref => (this.mapContainer = ref)}          dataLoading={this.state.dataLoading}          markersSearchResults={this.state.markersSearchResults}          updateRegionInScreen={this.updateRegionInScreen}          onRegionChangeComplete={this.onRegionChangeComplete}          radius={this.state.radius}          orgsDetailList={this.props.orgsDetailList}          fetchOrgDetail={this.props.fetchOrgDetail}          navigation={this.props.navigation}        >          <View style={styles.centerPointer} />        </MapContainer>        <View style={{ position: "absolute", top: 40,left:25 }}>          <Icon            name="menu"            color={"white"}            size={30}            type="materialicons"            onPress={() => {              this.props.navigation.navigate("DrawerOpen");            }}          />        </View>        <View style={styles.panContainer}>          <Text style={{ textAlign: "center", color: "white" }}>            {latitude.toFixed(2)}|{longitude.toFixed(2)}          </Text>          <Text style={{ textAlign: "center", color: "white" }}>            {latitudeDelta.toFixed(2)}|{longitudeDelta.toFixed(2)}          </Text>          <View            style={{              height: 200,              width: "100%",              alignItems: "flex-start"            }}          >            <ScrollView              horizontal              showsHorizontalScrollIndicator              style={{                height: 150,                marginRight: 10              }}            >              {Object.keys(this.props.orgsDetailList).map((orgKey, index) => {                let {                  name,                  address,                  city,                  zip,                  phone                } = this.props.orgsDetailList[orgKey];                return (                  <Button                    key={`orgDetail-${orgKey}`}                    style={{                      width: 200,                      marginBottom: 10,                      marginRight: 20,                      padding: 10                    }}                    onPress={() => {                      this.onPanItemPress(orgKey);                    }}                  >                    <Text>                      {orgKey}-{city}                    </Text>                    <Text>{name}</Text>                    <Text>                      Location: {address} - {city} - {zip}                    </Text>                    <Text>Call: {phone}</Text>                  </Button>                );              })}            </ScrollView>            <View              style={{                position: "absolute",                width: "100%",                bottom: 0,                flexDirection: "row",                justifyContent: "space-around"              }}            >              <Button                title={"r10"}                backgroundColor={"#009688"}                onPress={this.changeRadius10}              />              <Button                title={"r50"}                backgroundColor={"#009688"}                onPress={this.changeRadius50}              />              <Button                title={"search"}                backgroundColor={"#009688"}                onPress={() =>                  this.onSearchArea(latitude, longitude, this.state.radius)                }              />              <Button                title={"true"}                backgroundColor={"#009688"}                onPress={() => {                  this.setState({ dataLoading: true });                }}              />              <Button                title={"false"}                backgroundColor={"#009688"}                onPress={() => {                  this.setState({ dataLoading: false });                }}              />              <Button                title={"test"}                backgroundColor={"#009688"}                onPress={() => {                  this.props.navigation.navigate("mapDetail");                }}              />            </View>          </View>        </View>      </View>    );  }}const styles = StyleSheet.create({  container: {    flex: 1,    justifyContent: "center"  },  panContainer: {    width: "100%",    bottom: 0,    zIndex: 1,    position: "absolute"  },  spinner: {    zIndex: -1,    height: 40,    width: 40,    left: 0,    right: 0,    backgroundColor: "red"  },  centerPointer: {    width: 4,    height: 4,    backgroundColor: "white",    borderRadius: 25,    zIndex: 10    // position:'absolute',  }});function mapStateToProps(state) {  return {    jobsList: state.jobsList.results,    orgsDetailList: state.orgsDetailList  };}MapScreen.propTypes = {  jobsList: PropTypes.array.isRequired};MapScreen.defaultProps = {  jobsList: [],  orgsDetailList: {}};export default connect(mapStateToProps, actions)(MapScreen);