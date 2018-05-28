import React, { Component } from "react";
import { StyleSheet } from "react-native";
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
    this.props.setFocusedOrgID(marker.key);
    this.props.fetchOrgDetail(marker.key);
    this.props.fetchPetsByOrg(marker.key);
    this.focusMarker(marker.key);
    this.animateToCoord(marker);
  };
  focusMarker = markerKey => {
    this.setState({ focusedMarkerID: markerKey });
  };
  animateToCoord= markerData => {
    let coordinate = {
      latitude: markerData.location[0],
      longitude: markerData.location[1]
    }
    this.map.animateToCoordinate(coordinate, 500);
  };
  onRegionChangeComplete = region => {
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
    return (
      <MapView
        ref={ref => (this.map = ref)}
        style={styles.mapView}
        //showsMyLocationButton={true}
        loadingEnabled={true}
        moveOnMarkerPress={true}
        minZoomLevel={4}
        customMapStyle={mapDarkStyle}
        provider={"google"}
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
          fillColor={"rgba(114,255,250,0.5)"}
          strokeColor={"transparent"}
          geodesic={true}
        />

        {Object.keys(geoMarkersCurrentSearchResults).map(markerID => {
          let calloutVisible = false;
          let marker = geoMarkersCurrentSearchResults[markerID];
          if (marker.key === this.state.focusedMarkerID) {
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
        {this.props.children}
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
MapContainer.defaultProps={
  fetchOrgDetail: function () {}
}
export default MapContainer;
