// import React, { Component } from "react";
// import { WebView } from "react-native";
//
// const WebPage = ({ source }) => {
//   return <WebView source={{ uri: this.props.url }} style={{ marginTop: 20 }} />;
// };
import React, { Component } from "react";
import { WebView } from "react-native";

export default class WebPage extends Component {
  render() {
    return <WebView source={{ uri: this.props.url }} />;
  }
}
