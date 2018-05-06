import React, { Component } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store";
import { StyleSheet, Text, View } from "react-native";
import MainNavigator from "./src/navigation/MainNavigator";
import { PersistGate } from "redux-persist/integration/react";

import { Root } from 'native-base';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // firebase.initializeApp(fireConfig);
    // const firestoreSettings = {timestampsInSnapshots:true}
    // firebase.firestore.settings(firestoreSettings)
    // // disable warning yellow box in devices
    //TODO should remove when react-native and expo adopt react@16.3
    console.disableYellowBox = true;
  }

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
      <Provider store={store}>
        <PersistGate loading={<Text>Loading</Text>} persistor={persistor}>
          <View style={styles.container}>
            <Root>
            <MainNavigator />
            </Root>
            {/*<Deck
          data={DATA}
          renderCard={this.renderCard}
        />*/}
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    //marginTop : 30,  // for other phone  except x
    flex: 1,
    backgroundColor: "transparent"
  }
});

export default App;
