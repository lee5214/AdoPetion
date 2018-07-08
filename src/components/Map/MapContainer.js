import React, { Component } from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import Marker from "../../components/Map/Marker";
import { defaultRegion } from "../../../config/setting/defaultValues";

/*
 * don't use region from parent, it will cause map infinite render and keep
 * increasing latitude
 */
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedMarkerID: null,
      region: defaultRegion,
      focusedOrg: {},
      initialRegion: defaultRegion,
      customMap: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.orgsDetailList &&
      props.orgsDetailList.list[state.focusedMarkerID]
    ) {
      return { focusedOrg: props.orgsDetailList.list[state.focusedMarkerID] };
    }
    return null;
  }
  componentDidMount() {
    //current position
    navigator.geolocation.getCurrentPosition(pos => {
      const longitude = pos.coords.longitude;
      const latitude = pos.coords.latitude;
      /*this.setState({
        initialRegion: {
          latitude,
          longitude,
          latitudeDelta: 0.8,
          longitudeDelta: 0.6
        }
      });*/
      this.map.animateToCoordinate({ latitude, longitude }, 500);
    });
  }

  onMarkerPress = returnedMarkerCoord => {
    this.props.onMapMarkPress(returnedMarkerCoord.key);
    this.setState({ focusedMarkerID: returnedMarkerCoord.key, focusedOrg: {} });
    this.animateToCoord(returnedMarkerCoord);
  };

  animateToCoord = markerData => {
    let coordinate = {
      latitude: markerData.location[0],
      longitude: markerData.location[1]
    };
    this.map.animateToCoordinate(coordinate, 500);
  };
  onRegionChangeComplete = region => {
    //console.log(region)
    this.props.updateRegionInScreen(region);
    this.setState({ region: region, focusedMarkerID: -1 });
  };
  // clear focus so that when user click on map to remove callout and drag around, the callout will not render again
  render() {
    let {
      geoMarkersCurrentSearchResults,
      radius,
      orgsDetailList,
      ...rest
    } = this.props;
    //let focusedOrgDetail = orgsDetailList.list[this.state.focusedMarkerID];
    return (
      <MapView
        key={"MapViewContainer"}
        ref={ref => (this.map = ref)}
        style={styles.mapView}
        // loadingEnabled={true}
        // loadingIndicatorColor={'red'}
        // loadingBackgroundColor={'green'}
        //moveOnMarkerPress={true}
        minZoomLevel={8}
        //customMapStyle={this.state.customMap ? mapDarkStyle : mapLightStyle}
        provider={"google"}
        initialRegion={this.state.initialRegion}
        onRegionChangeComplete={this.onRegionChangeComplete}
        {...rest}
      >
        <MapView.Circle
          center={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
          }}
          radius={1000 * radius} //in meters
          fillColor={this.state.customMap?"rgba(100,100,100,0.5)":'rgba(100,100,100,.5)'}
          strokeColor={"transparent"}
          //geodesic={true}
        >
          {/*<Image style={{ height: 30, width: 30 }} source={require("../../assets/paw.png")} />*/}
        </MapView.Circle>

        {Object.keys(geoMarkersCurrentSearchResults).map(markerID => {
          let calloutVisible = false;
          let geoMarker = geoMarkersCurrentSearchResults[markerID];
          if (markerID === this.state.focusedMarkerID) {
            calloutVisible = true;
          }
          return (
            <Marker
              key={`marker-${geoMarker.key}`}
              focusedMarkerID={this.state.focusedMarkerID}
              geoMarker={geoMarker}
              focusedOrg={
                markerID === this.state.focusedMarkerID
                  ? this.state.focusedOrg
                  : null
              }
              orgsDetailList={orgsDetailList}
              onMarkerPress={this.onMarkerPress}
              calloutVisible={calloutVisible}
            />
          );
        })}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    zIndex: -1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  markerPoint: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#007AFF"
  }
});
export default MapContainer;
