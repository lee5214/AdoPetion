import React, { Component } from "react";import { connect } from "react-redux";import { Animated, Dimensions, Easing, Image, ScrollView, StyleSheet, Text, View } from "react-native";import { Button } from "react-native-elements";import * as actions from "../../actions";import Icon from "react-native-vector-icons/MaterialIcons";import { petDetailFieldList } from "../../../config/setting/defaultValues";const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");const SCREEN_RADIO = SCREEN_HEIGHT / SCREEN_WIDTH;class PetDetailList extends Component {  state = {    focusedPetIndex: -1,    elementAnimated: new Animated.Value(0),    isLiked: false  };  startElementBounce = Animated.timing(this.state.elementAnimated, {    toValue: 300,    easing: Easing.linear  });  static getDerivedStateFromProps(props, state) {    // check if current pet is liked    //const data = props.petObj.animalID; //props.navigation.getParam("petObj");    //if(props.likedPets.filter(pet=>pet.animalID===props.petObj.animalID).length>0){    if (props.likedPets && _.findIndex(props.likedPets, { animalID: props.petObj.animalID }) >= 0) {      return {        isLiked: true      };    } else {      return {        isLiked: false      };    }  }  componentDidUpdate(prevProps, prevState) {    if (this.props.flag !== prevProps.flag) {      this.startElementBounce.start(this.state.elementAnimated.setValue(0));    }  }  _renderBlock = arr => {    if (arr.length) {      return arr.map(item => <View>{item.key}</View>);    }  };  List = () => {    //let data = this.props.petObj;    return petDetailFieldList.map(      elePair =>        this.props.petObj[elePair[0]] &&        this.props.petObj[elePair[0]] !== "" && (          <View style={styles.row}>            <View style={[styles.eContainer]}>              <Text style={[styles.eKey]}>{elePair[1].toUpperCase()} </Text>              <Text style={[styles.eValue]}>{this.props.petObj[elePair[0]] || "N/A"}</Text>            </View>          </View>        )    );  };  toggleLiked = () => {    if (!this.state.isLiked) {      this.props.likePet(this.props.petObj);    } else {      this.props.unlikePet(this.props.petObj);    }  };  render() {    //console.log('yo',this.props.likedPets.filter(pet=>pet.animalID===this.props.petObj.animalID))    let {      name,      pictures,      size,      age,      sex,      color,      mix,      sizeCurrent,      sizeUOM,      breed,      birthdate,      adoptionFee,      descriptionPlain,      status    } = this.props.petObj;    //let data = [{ Availability: [{ Status: status }, { Fee: adoptionFee }] }];    let colorFlag = this.props.colorIndex % 2;    const fadeBounce = this.state.elementAnimated.interpolate({      inputRange: [0, 160, 180, 300],      outputRange: [1, 0, 0, 1]    });    const elementMoveLeft = this.state.elementAnimated.interpolate({      inputRange: [0, 140, 300],      outputRange: [0, -50, 0]    });    const elementMoveRight = this.state.elementAnimated.interpolate({      inputRange: [0, 140, 300],      outputRange: [0, 50, 0]    });    const elementMoveUp = this.state.elementAnimated.interpolate({      inputRange: [0, 140, 300],      outputRange: [0, -50, 0]    });    const elementMoveDown = this.state.elementAnimated.interpolate({      inputRange: [0, 140, 300],      outputRange: [0, 50, 0]    });    return (      <View style={{ flex: 1 }}>        {/*back bar*/}        <View          style={{            shadowColor: "black",            shadowOffset: { height: 0, width: 0 },            shadowOpacity: 0.2,            shadowRadius: 10,            position: "absolute",            flex: 1,            backgroundColor: "white",            height: SCREEN_HEIGHT,            width: SCREEN_WIDTH * 0.8,            left: SCREEN_WIDTH * 0.1          }}        />        {/*<View style={{position:'absolute',top:0,right:0,backgroundColor:'white',height:SCREEN_HEIGHT,width:SCREEN_WIDTH*.9,left:SCREEN_WIDTH*.05}}/>*/}        <ScrollView style={{ flex: 1, flexDirection: "column", backgroundColor: "transparent", paddingVertical: 0 }}>          <Text style={{ fontSize: 50, fontWeight: "700" }}>DETAILS</Text>          <View style={{ position: "absolute", height: "100%" }} />          {pictures &&            pictures.length > 0 &&            pictures.map(pic => (              <Image                source={{ uri: pic.fullsizeUrl }}                style={{ flex: 1, width: SCREEN_WIDTH - 40, height: SCREEN_WIDTH - 100, left: 20, marginVertical: 10 }}              />            ))}          <Button            buttonStyle={{ backgroundColor: "white", marginVertical: 10, width: SCREEN_WIDTH * 0.8, alignSelf: "center" }}            titleStyle={{ color: "red" }}            onPress={() => {              this.toggleLiked();            }}            title={this.state.isLiked ? "Liked" : "Like Me "}            icon={              <Icon                title={"liked"}                name={this.state.isLiked ? "favorite" : "favorite-border"}                //color={COLORS[colorIndex]}                color={"red"}                size={30}                type="materialicons"              />            }          />          <View style={{ flex: 1, width: SCREEN_WIDTH * 0.8, left: SCREEN_WIDTH * 0.1 }}>            <this.List />            <View style={[styles.eContainer, { flexDirection: "column" }]}>              <Text style={[styles.eKey]}>DESCRIPTION</Text>              <Text style={[styles.eValue, { textAlign: "left" }]}>{descriptionPlain}</Text>            </View>          </View>        </ScrollView>      </View>    );  }}const styles = StyleSheet.create({  row: { flexDirection: "row", marginVertical: 10, justifyContent: "space-between" },  eContainer: {    flex: 1,    flexDirection: "column",    //overflow: "hidden",    marginHorizontal: 10,    paddingVertical: 10,    borderRadius: 5,    borderBottomWidth: 1,    borderBottomColor: "#696969"    //backgroundColor:'red',  },  eKey: { flex: 1, color: "#292929", fontSize: 12, fontWeight: "600", textAlign: "left", marginBottom: 10 },  eValue: { flex: 1, color: "black", fontSize: 14, fontWeight: "500", textAlign: "right", marginRight: 0 },  description: { color: "white", fontSize: 12, fontWeight: "500", textAlign: "left" }});function mapStateToProps(state) {  return {    likedPets: state.likedPets  };}export default connect(mapStateToProps, actions)(PetDetailList);