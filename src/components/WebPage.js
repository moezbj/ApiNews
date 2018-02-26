// import React, { Component } from "react";
// import { WebView } from "react-native";
//
// const WebPage = ({ source }) => {
//   return <WebView source={{ uri: this.props.url }} style={{ marginTop: 20 }} />;
// };
import React, { Component } from "react";
import { WebView } from "react-native";

export default class WebPage extends Component {
  static navigationOptions = {
    title: "Description"
  };
  render() {
    return (
      <WebView
        source={{
          uri:
            "https://facebook.github.io/react-native/docs/activityindicator.html"
        }}
      />
    );
  }
}
