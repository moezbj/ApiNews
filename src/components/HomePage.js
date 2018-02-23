import React, { Component } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  ListItem,
  FlatList,
  Linking,
  ScrollView
} from "react-native";
import axios from "axios";
import autoBind from "react-autobind";

import { NewsPage } from "./NewsPage";
import SearchPage from "./SearchPage";
import Button from "./Button";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    };
    autoBind(this);
    this.dataSource = this.state.ds.cloneWithRows(this.state.data);
  }
  openLink(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + el.apiUrl);
      }
    });
  }

  searchNews = value => {
    const { page, seed } = this.state;
    const url =
      "https://content.guardianapis.com/search?q=" +
      value +
      "&api-key=test&show-fields=starRating,headline,thumbnail";
    this.setState({ loading: true });
    axios
      .get(url)
      .then(response => {
        this.setState({
          data:
            page === 1
              ? response.data.response.results
              : [...this.state.data, ...response.data.response.results],
          error: response.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };
  renderItem = ({ item }) => (
    <View>
      <Text>{item.webTitle}</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: item.fields.thumbnail }}
      />
      <Text onPress={() => this.openLink(item.webUrl)}>
        For More Indormation Click here
      </Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <SearchPage searchNews={this.searchNews} />
        <FlatList
          data={this.state.data}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
export default HomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    color: "red"
  },
  img: {
    width: 200,
    height: 200
  },
  card: {
    flexDirection: "column",
    borderColor: "red",
    borderWidth: 1
  }
});
