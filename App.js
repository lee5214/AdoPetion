import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Linking,
  Button,
  PanResponder
} from "react-native";
import TabNavigator from "./src/components/TabNavigator";
class App extends React.Component {
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
      <SafeAreaView style={styles.container}>
        <TabNavigator />
        {/*<Deck
          data={DATA}
          renderCard={this.renderCard}
        />*/}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
