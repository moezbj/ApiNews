import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import autoBind from "react-autobind";

import { Input } from "./Input";
import { Button } from "./Button";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
    autoBind(this);
  }
  onChangeText = newValue => {
    this.setState({
      inputValue: newValue
    });
  };
  render() {
    return (
      <View style={styles.search}>
        <Input
          value={this.state.inputValue}
          onChangeText={this.onChangeText}
          placeholder="sports"
          label="Search"
          style={styles.inputStyle}
        />
        <Button onPress={() => this.props.searchNews(this.state.inputValue)}>
          Search
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#F5FCFF"
  }
});

export default SearchPage;
