import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const NewsCard = ({ props, children, img }) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.title}>{props}</Text>
      <Image style={styles.img} source={{ uri: img }} />
      <Text style={styles.link}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column"
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    fontSize: 20,
    borderColor: "blue",
    borderWidth: 1
  },
  img: {
    width: 300,
    height: 300,
    alignSelf: "center"
  },
  link: {
    borderColor: "red",
    borderWidth: 1
  }
});

export { NewsCard };
