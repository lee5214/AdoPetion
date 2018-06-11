import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import mapDarkStyle from "../../assets/mapDarkStyle";
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
      region: defaultRegion
    };
  }
  onMarkerPress = marker => {
    this.props.onMapMarkPress(marker.key);
    this.setState({ focusedMarkerID: marker.key });
    this.animateToCoord(marker);
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
    this.setState({ region: region, focusedMarkerID: null });
  };
  onMapReady = () => {
    //Platform.OS === 'ios' && this.map.animateToRegion(defaultRegion, 0.1);
  };
  // clear focus so that when user click on map to remove callout and drag around, the callout will not render again
  onDeselectMarker = () => {
    this.setState({ focusedMarkerID: null });
  };
  render() {
    let {
      geoMarkersCurrentSearchResults,
      radius,
      orgsDetailList,
      onRegionChangeComplete
    } = this.props;
    return [
      <MapView
        key={"MapViewContainer"}
        ref={ref => (this.map = ref)}
        style={styles.mapView}
        //showsMyLocationButton={true}
        //loadingEnabled={true}
        moveOnMarkerPress={true}
        minZoomLevel={8}
        customMapStyle={mapDarkStyle}
        provider={"google"}
        //region={this.state.region}
        initialRegion={defaultRegion}
        onRegionChangeComplete={this.onRegionChangeComplete}
        //onMapReady={this.onMapReady}
      >
        <MapView.Circle
          center={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
          }}
          radius={1000 * radius} //in meters
          fillColor={"rgba(255,255,255,0.5)"}
          strokeColor={"transparent"}
          geodesic={true}
        >
          <Image style={{height:30,width:30}}source={require('../../assets/paw.png')}/>
        </MapView.Circle>

        {Object.keys(geoMarkersCurrentSearchResults).map(markerID => {
          let calloutVisible = false;
          let marker = geoMarkersCurrentSearchResults[markerID];
          if (marker.key === this.state.focusedMarkerID && orgsDetailList[this.state.focusedMarkerID]) {
            console.log('container/calloutvisible')
            calloutVisible = true;
          }
          return (
            <Marker
              key={`marker-${marker.key}`}
              marker={marker}
              orgsDetailList={orgsDetailList}
              onMarkerPress={this.onMarkerPress}
              onDeselectMarker={this.onDeselectMarker}
              calloutVisible={calloutVisible}
            />
          );
        })}
      </MapView>,
      <View key={"MapViewChildrenContainer"} style={{ position: "absolute" }}>
        {/*children should be siblings of MapView   read: https://github.com/react-community/react-native-maps/issues/1901*/}
        {this.props.children}
      </View>
    ];
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
MapContainer.defaultProps = {
};
export default MapContainer;
