import React, { Component } from "react";import { MapView } from "expo";import mapDarkStyle from "../../assets/mapDarkStyle";import Marker from "../../components/Map/Marker";class MapContainer extends Component {  state = {    currentCallOut: null  };  // static getDerivedStateFromProps(nextProps, preProps) {  //   if (nextProps.orgsDetailList) {  //     console.log("nextProps");  //     return { calloutDetailList: nextProps.orgsDetailList };  //   }  // }  // componentWillReceiveProps(nextProps) {  //   if (nextProps.orgsDetailList) {  //     console.log("cWillRecieveProps: ", Object.keys(nextProps.orgsDetailList).map(obj=>{return obj}));  //     this.setState({ calloutDetailList: nextProps.orgsDetailList });  //   }  // }  // shouldComponentUpdate(nextProps,nextState){  //   console.log('shouldcomponentupdate')  //   return nextProps.orgsDetailList != this.state.calloutDetailList  // }  /*  * @param  */  onMarkerPress = markerKey => {    console.log("button onpressed");    //this.props.navigation.navigate('deck')    this.props.fetchOrgDetail(markerKey);  };  render() {    //console.log("MapContainer dataLoading", this.state.calloutDetailList);    let { markersList, region, radius, onRegionChangeComplete } = this.props;    return (      <MapView        style={styles.mapView}        // showsMyLocationButton={true}        //loadingEnabled={true}        //showsPointsOfInterest={true}        minZoomLevel={4}        customMapStyle={mapDarkStyle}        provider={MapView.PROVIDER_GOOGLE}        region={region}        /*initialRegion={{          longitude: -100,          latitude: 37,          longitudeDelta: 0.04,          latitudeDelta: 0.09        }}*/        onRegionChangeComplete={onRegionChangeComplete}      >        <MapView.Circle          center={{            latitude: region.latitude,            longitude: region.longitude          }}          radius={1000 * radius} //in meters          fillColor={"rgba(114,255,250,0.5)"}          strokeColor={"transparent"}          geodesic={true}        />        {markersList.map(marker => (          <Marker            key={`marker-${marker.key}`}            marker={marker}            orgsDetailList={this.props.orgsDetailList}            onMarkerPress={this.onMarkerPress}          />        ))}        {this.props.children}      </MapView>    );  }}const styles = {  mapView: {    //zIndex: -1,    flex: 1    //justifyContent: "center",    //alignItems: "center"  },  markerPoint: {    height: 20,    width: 20,    borderWidth: 3,    borderColor: "white",    borderRadius: 10,    overflow: "hidden",    backgroundColor: "#007AFF"  },  calloutContainer: {    backgroundColor: "red",    height: 50,    width: 100  },  spinnerContainer: {    width: 400,    height: 400,    left: 0,    right: 0,    top: 100,    justifyContent: "center",    backgroundColor: "transparent"  }};export default MapContainer;