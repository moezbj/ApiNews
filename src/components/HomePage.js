import React, { Component } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import autoBind from "react-autobind";

import { NewsPage } from "./NewsPage";
import SearchPage from "./SearchPage";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      posts: []
    };
    autoBind(this);
  }

  searchNews(value) {
    axios
      .get(
        "https://content.guardianapis.com/search?q=" +
          value +
          "&api-key=test&show-fields=starRating,headline,thumbnail"
      )
      .then(response => {
        this.setState({ posts: response.data.response.results });
        console.log(this.state.posts);
      })
      .catch(function(error) {
        console.warn(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <SearchPage searchNews={this.searchNews} />
        {this.state.posts.map((el, i) => {
          return (
            <NewsPage key={i}>
              <Text>{el.fields.headline}</Text>
              <Image
                style={{ width: 90, height: 90 }}
                source={{ uri: el.fields.thumbnail }}
              />
              <Text>{el.fields.apiUrl}</Text>
            </NewsPage>
          );
        })}
      </View>
    );
  }
}
export default HomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
