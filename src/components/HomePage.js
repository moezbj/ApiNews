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
  ActivityIndicator
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
      size: false,
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    };
    this.searchNews = this.searchNews.bind(this);
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

  searchNews = () => {
    const { page, seed, search } = this.state;
    const url =
      "https://content.guardianapis.com/search?q=" +
      search +
      "&api-key=21ac95f2-7287-4ba5-a5e6-54519d21a76b&show-fields=all&page-Size=10&page=" +
      page;
    this.setState({ loading: true });
    axios
      .get(url)
      .then(response => {
        this.setState({
          page: this.state.page + 1,
          data: [...this.state.data, ...response.data.response.results],
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
        <SearchPage
          inputValue={this.state.search}
          onChangeText={value =>
            this.setState({
              search: value
            })
          }
          searchNews={this.searchNews}
        />
        <FlatList
          onContentSizeChange={() => this.setState({ size: true })}
          onEndReached={this.state.size ? this.searchNews : null}
          onEndReachedThreshold={0.2}
          data={this.state.data}
          renderItem={this.renderItem}
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
