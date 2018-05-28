import React, { Component } from "react";import { Button, StyleSheet, Text, View } from "react-native";import Carousel from "react-native-snap-carousel";/*data Array [  18:08:03:   Object {  18:08:03:     "about": "",    18:08:03:     "address": "39120 Argonaut Way, PMB 108 (this is not a shelter)",    18:08:03:     "adoptionProcess": "",    18:08:03:     "allowAppSubmissions": "No",    18:08:03:     "city": "Fremont",    18:08:03:     "country": "United States",    18:08:03:     "email": "info@ohlonehumanesociety.org",    18:08:03:     "facebookUrl": "www.facebook.com/OhloneHumaneSociety",    18:08:03:     "fax": "",    18:08:03:     "geoLocation": GeoPoint {    18:08:03:       "_lat": 37.5222923,      18:08:03:       "_long": -122.0566002,      18:08:03:     },  18:08:03:     "meetPets": "",    18:08:03:     "messageOrg": "Yes",    18:08:03:     "name": "Ohlone Humane Society",    18:08:03:     "orgID": "3620",    18:08:03:     "orgSpecies": "dogs cats and wildlife rehabilitation center - birds, skunks, possums all wildlife",    18:08:03:     "orgType": "Rescue",    18:08:03:     "orgurl": "www.OhloneHumaneSociety.org",    18:08:03:     "phone": "(510) 792-4587",    18:08:03:     "serveAreas": "",    18:08:03:     "services": "",    18:08:03:     "state": "CA",    18:08:03:     "status": "Available",    18:08:03:     "zip": "94538-1304",    18:08:03:   },18:08:03: ]*/export default class MapOrgsCarousel extends Component {  state = {    currentIndex: null,    data: []  };  // noinspection JSUnusedGlobalSymbols  static getDerivedStateFromProps(props, state) {    if (      props.petsByOrg.list &&      props.focusedOrgID &&      props.petsByOrg.list[props.focusedOrgID]    ) {      let dataObj = props.petsByOrg.list[props.focusedOrgID];      let tempArr = Object.keys(dataObj).map(petID => dataObj[petID]);      console.log("tempArr", tempArr);      return { data: tempArr };    }    return null;  }  renderItem = ({ item, index }) => {    if (this.props.itemType === "orgs") {      const { name, orgID } = item;      return (        <View style={styles.slide}>          <Text style={styles.title}>{name}</Text>          {/*<Image*/}          {/*source={{ uri: item.illustration }}*/}          {/*style={{ width: "100%", height: "100%" }}*/}          {/*/>*/}          <Button            title={"Paw!"}            onPress={() => {              this.props.onPanItemPress(orgID);              console.log("index", this._carousel.currentIndex);            }}          />        </View>      );    } else if (this.props.itemType === "pets") {      return <View />;    }  };  render() {    const {      orgsDetailList,      petsByOrg,      orgsSearchedID,      data,      carouselData,      focusedOrgID    } = this.props;    // const orgsData = orgsSearchedID.map(id => orgsDetailList.list[id]);    // console.log('pets',data)    // const petsData = Object.keys(data).map(id=>data[id])    // console.log(petsData)    console.log("data: ", petsByOrg.list[focusedOrgID]);    console.log("dd: ", this.state.data);    return (      <View        style={{          position: "absolute",          bottom: 0,          width: "100%"        }}      >        <View style={{ bottom: 180 }} />        <View          style={{            flexDirection: "row",            height: Object.keys(orgsDetailList.list).length > 0 ? 150 : 0,            bottom: 0,            alignSelf: "stretch"          }}        >          <Carousel            layout={"default"}            ref={c => {              this._carousel = c;            }}            containerCustomStyle={styles.carouselContainer}            data={this.state.data}            renderItem={this.renderItem}            sliderWidth={400}            sliderHeight={350}            itemWidth={256}            itemHeight={200}            firstItem={0}            onScroll={this.test}          />        </View>      </View>    );  }}styles = StyleSheet.create({  carouselContainer: {    flexGrow: 0  },  slide: {    height: 200,    backgroundColor: "white"  },  title: {    fontSize: 16,    padding: 6  }});