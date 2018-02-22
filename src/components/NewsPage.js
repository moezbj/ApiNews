import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const NewsPage = props => {
  return (
    <View style={styles.containerStyle}>
      <Text>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export { NewsPage };
