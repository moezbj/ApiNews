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
import { NativeRouter, Route, Link } from "react-router-native";

import { NewsPage } from "./NewsPage";
import SearchPage from "./SearchPage";
import Button from "./Button";
import WebPage from "./WebPage";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: false,
      data: [],
      page: 1,
      error: null,
      size: false,
      isClicked: false,
      refreshing: false,

      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    };
    this.searchNews = this.searchNews.bind(this);
    this.dataSource = this.state.ds.cloneWithRows(this.state.data);
  }

  searchNews = () => {
    this.setState({ loading: true });
    const { page, search } = this.state;
    const url =
      "https://content.guardianapis.com/search?q=" +
      search +
      "&api-key=21ac95f2-7287-4ba5-a5e6-54519d21a76b&show-fields=all&page-Size=10&page=" +
      page;
    axios
      .get(url)
      .then(response => {
        this.setState({
          page: this.state.page + 1,
          data: [...this.state.data, ...response.data.response.results],
          error: response.error || null,
          loading: false,
          seed: 1,
          refreshing: false,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  renderItem = ({ item }) => (
    <View>
      <Text style={styles.title}>{item.webTitle}</Text>
      <Image style={styles.img} source={{ uri: item.fields.thumbnail }} />
      <Link to="/webpage">
        <Text
          onPress={() => this.props.getUrl(item.webUrl)}
          style={styles.link}
        >
          For More Indormation Click here
        </Text>
      </Link>
    </View>
  );

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handeleRefresh = () => {
    this.setState(
      {
        page: this.state.page,
        refreshing: true,
        seed: this.state.seed + 1
      },
      () => {
        this.searchNews();
      }
    );
  };
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
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          keyExtractor={item => item.id}
          refreshing={this.state.refreshing}
          onRefresh={this.handeleRefresh}
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
    color: "red",
    fontSize: 20
  },
  img: {
    width: 300,
    height: 300,
    alignSelf: "center"
  },
  link: {
    fontSize: 20
  }
});
