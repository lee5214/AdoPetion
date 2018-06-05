import React from "react";import { TouchableOpacity, View } from "react-native";import Icon from "react-native-vector-icons/MaterialIcons";import { CheckBox } from "react-native-elements";const SearchArea = props => {  return (    <View      style={{        position: "absolute",        flexDirection: "row",        width: 150,        left: (props.SCREEN_WIDTH - 150) / 2,        height: 50,        top: props.CARD_MAX_Y - 50, //(SCREEN_HEIGHT - 50) / 2,        zIndex: 10,      }}    >      <View style={{ flex: 1 }}>        <CheckBox          size={20}          containerStyle={{ paddingRight: 0 }}          checkedIcon="dot-circle-o"          uncheckedIcon="circle-o"          uncheckedColor="white"          checkedColor="white"          onPress={props.setR10}          checked={props.radius === 10}        />      </View>      <TouchableOpacity        style={{          flex: 1,          backgroundColor: "white",          borderRadius: 25        }}        onPress={props.onSearchArea}      >        <Icon          name="location-searching"          size={40}          style={{ margin: 5 }}          type="materialicons"        />      </TouchableOpacity>      <View style={{ flex: 1 }}>        <CheckBox          size={30}          center          containerStyle={{ padding: 5, paddingLeft: 10 }}          checkedIcon="dot-circle-o"          uncheckedIcon="circle-o"          uncheckedColor="white"          checkedColor="white"          onPress={props.setR50}          checked={props.radius === 50}        />      </View>    </View>  );};export default SearchArea;