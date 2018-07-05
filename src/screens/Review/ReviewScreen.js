import React, { Component } from "react";import { connect } from "react-redux";import PropTypes from "prop-types";import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";import { Card } from "react-native-elements";import Icon from "react-native-vector-icons/MaterialIcons";const { width: SCREEN_WIDTH } = Dimensions.get("window");class ReviewScreen extends Component {  static navigationOptions = ({ navigation }) => ({    drawerLockMode: "locked-open",    title: "Following",    tabBarLabel: "Review",    tabBarOptions: {      tabBarIcon: ({ tintColor }) => {        return <Icon name="favorite-border" color={tintColor} size={20} type="materialicons" />;      }    }  });  toPetDetail = pet => {    this.props.navigation.navigate("reviewPetDetail", { petObj: pet });  };  render() {    return (      <View style={{overflow: "hidden", flex: 1 }}>        {!this.props.likedPets.length&&          <Text>You haven't follow any pets here, add some to keep tracking their activities.</Text>        }        <ScrollView>          {this.props.likedPets.map(pet => {            const { name, animalID, orgID, descriptionPlain, pictures } = pet;            return (              <TouchableOpacity                key={`likedPetList-${animalID}`}                activeOpacity={0.9}                onPress={() => this.toPetDetail(pet)}                style={{                  shadowColor: "black",                  shadowOffset: { height: 0, width: 0 },                  shadowOpacity: 0.1,                  shadowRadius: 10                }}              >                <Card key={`reviewScreen-${animalID}`}>                  <View style={{ height: 110,flexDirection:'row' }}>                    <View style={{ flex:3,flexDirection: "column",marginRight:10 }}>                      <Text style={{fontWeight:'600',fontSize:14,marginVertical:10}}>{name}</Text>                      <Text style={{ flex: 1 ,fontSize:12,}} numberOfLines={4}>                        {descriptionPlain}                      </Text>                    </View>                    <View style={{flex:1}}>                      {_.has(pictures[0], "thumbnailUrl") && (                        <Image style={{width: 100, height: 100 }} source={{ uri: pictures[0].thumbnailUrl || null }} />                      )}                    </View>                  </View>                </Card>              </TouchableOpacity>            );          })}        </ScrollView>      </View>    );  }}const mapStateToProps = state => {  return {    likedPets: state.likedPets    //orgsDetailList: state.orgsDetailList  };};ReviewScreen.defaultProps = {  likedPets: []};ReviewScreen.propTypes = {  likedPets: PropTypes.array.isRequired};export default connect(mapStateToProps, null)(ReviewScreen);