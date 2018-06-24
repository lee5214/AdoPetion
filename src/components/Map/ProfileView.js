import React, { Component } from "react";import { Animated, Dimensions, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");class ProfileView extends Component {  state = {    focusedPetIndex: -1,    elementAnimated: new Animated.Value(300)  };  startElementBounce = Animated.timing(this.state.elementAnimated, {    toValue: 300,    easing: Easing.linear  });  componentDidUpdate(prevProps, prevState) {    if (this.props.flag !== prevProps.flag) {      this.startElementBounce.start(this.state.elementAnimated.setValue(0));    }  }  _renderBlock = arr => {    if (arr.length) {      return arr.map(item => <View>{item.key}</View>);    }  };  render() {    let {      name,      pictures,      size,      age,      sex,      color,      mix,      sizeCurrent,      sizeUOM,      breed,      birthdate,      adoptionFee,      descriptionPlain,      status    } = this.props.petObj;    //let data = [{ Availability: [{ Status: status }, { Fee: adoptionFee }] }];    let colorFlag = this.props.colorIndex % 2;    const fadeBounce = this.state.elementAnimated.interpolate({      inputRange: [0, 300],      outputRange: [0, 1]    });    const elementMoveLeft = this.state.elementAnimated.interpolate({      inputRange: [0, 140, 300],      outputRange: [0, -50, 0]    });    const elementMoveRight = this.state.elementAnimated.interpolate({      inputRange: [0, 140, 300],      outputRange: [0, 50, 0]    });    const elementMoveUp = this.state.elementAnimated.interpolate({      inputRange: [0, 300],      outputRange: [-150, 0]    });    const elementMoveDown = this.state.elementAnimated.interpolate({      inputRange: [0, 300],      outputRange: [50, 0]    });    return (      <View style={{ flex: 1, flexDirection: "column", paddingHorizontal: 20, paddingBottom: 50 }}>        <View style={{ flex: 1, marginBottom: 20 }}>          <Animated.Text            style={[              { color: "white", fontSize: 24, fontWeight: "600", marginBottom:10 },              { opacity: fadeBounce, transform: [{ translateY: elementMoveUp }] }            ]}          >            {name}          </Animated.Text>          <Animated.Text style={{ color:'#2d2d2d',opacity: fadeBounce, transform: [{ translateY: elementMoveDown }] }}>            {sex && <Text>{sex}</Text>}            {age && <Text> | {age}</Text>}            {size && <Text> | {size}</Text>}          </Animated.Text>        </View>        <TouchableOpacity          style={{            shadowColor: "black",            shadowOffset: { height: 20, width: 10 },            shadowOpacity: 0.4,            shadowRadius: 50,            justifyContent: "center",            alignItems: "center",            position: "absolute",            bottom: -30,            right: -20,            paddingHorizontal: 0,            paddingVertical: 10,            width: 200,            height: 70,            backgroundColor: "rgba(0,0,0,1)",          }}          onPress={() => this.props.navigation.navigate("mapDetail", { petObj: this.props.petObj })}        >          <Text style={{ fontSize:13,fontWeight:'500',color: "white" }}>MORE  DETAILS</Text>        </TouchableOpacity>      </View>    );  }  renderProfileItem = ({ item, index }) => {    const { fullsizeUrl } = item;    return (      <View        style={{          flexGrow: 1,          //borderRadius: 10,          overflow: "hidden"        }}      >        <Image          source={{ uri: fullsizeUrl }}          style={{            flexGrow: 1,            height: "100%",            width: "100%",            position: "absolute"          }}        />      </View>    );  };}const styles = StyleSheet.create({  row: { flexDirection: "row", marginVertical: 10, justifyContent: "space-between" },  eContainer: {    flex: 1,    flexDirection: "row",    //overflow: "hidden",    marginHorizontal: 10,    paddingVertical: 10,    borderRadius: 5    //backgroundColor:'red',  },  eKey: { flex: 1, fontSize: 12, fontWeight: "800", textAlign: "left", marginBottom: 0 },  eValue: { flex: 2, color: "black", fontSize: 14, fontWeight: "500", textAlign: "left", marginRight: 0 },  description: { color: "white", fontSize: 14, fontWeight: "500", textAlign: "left" }});export default ProfileView;