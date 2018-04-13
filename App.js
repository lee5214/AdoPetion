import React, { Component } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';
import { SafeAreaView, StyleSheet } from "react-native";
import Navigator from "./src/components/Navigator";

const store = createStore (
  reducers, {}, compose (applyMiddleware (thunk)),
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  // renderCard = item => {
  //   return (
  //     <Card key={item.id} title={item.title} image={{ uri: item.uri }}>
  //       <Text>{item.text}</Text>
  //       <Button icon={{ name: "code" }} title="wOw" onPress={() => {}} />
  //     </Card>
  //   );
  // };

  render() {
    return (
      <Provider store={ store }>
        <SafeAreaView style={ styles.container }>
          <Navigator/>
          { /*<Deck
          data={DATA}
          renderCard={this.renderCard}
        />*/}
        </SafeAreaView>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop : 30,
    flex : 1,
    backgroundColor : 'transparent',
  }
});

export default App;
