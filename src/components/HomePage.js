import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, ListView, FlatList} from 'react-native';
import axios from 'axios';
import {StackNavigator} from 'react-navigation';
import PropTypes from 'prop-types';

import {NewsPage} from './NewsPage';
import SearchPage from './SearchPage';
import WebPage from './WebPage';
import Spinner from './Spinner';

class HomePage extends Component {
  static navigationOptions = {
    title: 'News App',
    headerStyle: {backgroundColor: '#253748'},
    headerLeft: (
      <Image
        style={{width: 50, height: 50, flex: 1}}
        source={{
          uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
        }}
      />
    ),
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 16,
      alignSelf: 'center',
      flex: 2
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      loading: false,
      data: [],
      page: 1,
      error: null,
      size: false,
      refreshing: false,
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
    this.searchNews = this.searchNews.bind(this);
    this.dataSource = this.state.ds.cloneWithRows(this.state.data);
  }

  componentWillMount() {
    this.searchNews();
  }
  searchNews = () => {
    this.setState({loading: true});
    const {page, search} = this.state;
    const url = `https://content.guardianapis.com/search?q=${search}&api-key=21ac95f2-7287-4ba5-a5e6-54519d21a76b&show-fields=all&page-Size=10&page=${page}`;
    axios
      .get(url)
      .then(response => {
        this.setState({
          page: this.state.page + 1,
          data: [...this.state.data, ...response.data.response.results],
          error: response.error || null,
          loading: false,
          seed: 1,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({error});
      });
  };

  renderItem = ({item}) => {
    const navigate = this.props.navigation.navigate;
    return (
      <NewsPage>
        <Text>{item.webTitle}</Text>
        <Image source={{uri: item.fields.thumbnail}} />
        <Text onPress={() => navigate('WebPage', {url: item.webUrl})}>For More Indormation Click here</Text>
      </NewsPage>
    );
  };

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        margin: 10
      }}
    />
  );

  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }
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

  onChangeText = newValue => {
    this.setState({
      search: newValue
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchPage inputValue={this.state.search} onChangeText={this.onChangeText} searchNews={this.searchNews} />
        <FlatList
          onContentSizeChange={() => this.setState({size: true})}
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
    backgroundColor: '#F5FCFF'
  }
});

HomePage.propTypes = {
  navigation: PropTypes.object,
  navigate: PropTypes.func
};
const NavScreen = StackNavigator({
  Home: {screen: HomePage},
  WebPage: {screen: WebPage}
});

export default NavScreen;
