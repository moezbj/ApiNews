import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import HomePage from "./src/components/HomePage";
import WebPage from "./src/components/WebPage";
import NavScreen from "./src/components/NavScreen";

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
    this.getUrl = this.getUrl.bind(this);
  }

  getUrl(newUrl) {
    this.setState({
      url: newUrl
    });
    console.warn("fffff");
  }
  render() {
    return (
      <View style={styles.container}>
        <HomePage />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  }
});
