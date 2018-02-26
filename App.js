import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import HomePage from "./src/components/HomePage";
import WebPage from "./src/components/WebPage";

export default class App extends Component<Props> {
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
