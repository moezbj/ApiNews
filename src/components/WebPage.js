import React, { Component } from "react";
import { WebView } from "react-native";
import { StackNavigator } from "react-navigation";

export default class WebPage extends Component {
  static navigationOptions = {
    title: "Description"
  };
  render() {
    const { params } = this.props.navigation.state;
    const url = params ? params.url : null;
    return (
      <WebView
        source={{
          uri: url
        }}
      />
    );
  }
}
