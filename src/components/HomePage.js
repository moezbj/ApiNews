import React, { Component } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
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
      posts: [],
      page: 1
    };
    autoBind(this);
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

  searchNews(value) {
    this.setState({
      search: value
    });
    axios
      .get(
        "https://content.guardianapis.com/search?q=" +
          value +
          "&api-key=test&show-fields=starRating,headline,thumbnail"
      )
      .then(response => {
        this.setState({
          posts: response.data.response.results,
          page: response.data.response.currentPage
        });
        console.log(this.state.page);
      })
      .catch(function(error) {
        console.warn(error);
      });
  }
  handlePageChange(e) {
    var offset = e.nativeEvent.contentOffset;
    var pageNb = this.state.page + 1;
    var value = this.state.search;
    if (offset) {
      axios
        .get(
          "https://content.guardianapis.com/search?q=" +
            value +
            "&api-key=test&show-fields=starRating,headline,thumbnail-currentPage" +
            pageNb
        )
        .then(response => {
          this.setState(prevState => {
            let { posts, page } = prevState;
            response.data.response.results.map((el, i) => {
              posts.push(el);
            });
            return {
              posts,
              page: prevState.page + response.data.response.currentPage
            };
          });
        });
    }
  }

  render() {
    console.log(this.state.posts);
    return (
      <ScrollView onMomentumScrollEnd={this.handlePageChange}>
        <View style={styles.container}>
          <SearchPage searchNews={this.searchNews} />
          {this.state.posts.map((el, i) => {
            return (
              <NewsPage key={i} style={styles.card}>
                <Text style={styles.title}>{el.fields.headline}</Text>
                <Image
                  style={styles.img}
                  source={{ uri: el.fields.thumbnail }}
                />
                <Text onPress={() => this.openLink(el.apiUrl)}>
                  For more information Click Here
                </Text>
              </NewsPage>
            );
          })}
        </View>
      </ScrollView>
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
