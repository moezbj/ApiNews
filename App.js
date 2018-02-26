import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import HomePage from "./src/components/HomePage";
import WebPage from "./src/components/WebPage";
import { NativeRouter, Route, Link } from "react-router-native";

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
      <NativeRouter>
        <View style={styles.container}>
          <Route
            exact
            path="/"
            render={() => <HomePage getUrl={this.getUrl} />}
          />
          <Route
            path="/webpage"
            render={() => <WebPage url={this.state.url} />}
          />
        </View>
      </NativeRouter>
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
