import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const NewsPage = ({ props, children }) => {
  return (
    <View style={styles.containerStyle}>
      <Text>{props}</Text>

      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "green"
  }
});

export { NewsPage };
