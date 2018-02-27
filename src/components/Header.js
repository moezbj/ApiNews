import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View style={{ flex: 1 }} />
        <View style={styles.centerFlex}>
          <Text style={styles.text}>News App</Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    backgroundColor: "#253748",
    justifyContent: "space-around"
  },
  centerFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  nav: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    height: 40,
    width: 40,
    backgroundColor: "#f15c24",
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 20
  }
});
