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
import { StackNavigator } from "react-navigation";

import { NewsPage } from "./NewsPage";
import SearchPage from "./SearchPage";
import Button from "./Button";
import WebPage from "./WebPage";
import Spinner from "./Spinner";
import Icon from "react-native-vector-icons/FontAwesome";

class HomePage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: false,
      data: [],
      page: 1,
      error: null,
      size: false,
      refreshing: false,
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    };
    this.searchNews = this.searchNews.bind(this);
    this.dataSource = this.state.ds.cloneWithRows(this.state.data);
  }

  componentWillMount() {
    this.searchNews();
  }
  searchNews = () => {
    this.setState({ loading: true });
    const { page, search } = this.state;
    const url =
      "https://content.guardianapis.com/search?q=" +
      this.props.search +
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

  renderItem = ({ item }) => {
    const navigate = this.props.navigation.navigate;

    return (
      <View>
        <Text style={styles.title}>{item.webTitle}</Text>
        <Image style={styles.img} source={{ uri: item.fields.thumbnail }} />
        <Text
          onPress={() => navigate("WebPage", { url: item.webUrl })}
          style={styles.link}
        >
          For More Indormation Click here
        </Text>
      </View>
    );
  };

  newData = () => {
    this.setState({
      data: []
    });
  };

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
    return <Spinner />;
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
          newData={this.newData}
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
          keyExtractor={(item, key) => key.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handeleRefresh}
        />
      </View>
    );
  }
}
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

const NavScreen = StackNavigator({
  Home: { screen: HomePage },
  WebPage: { screen: WebPage }
});
export default NavScreen;
