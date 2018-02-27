import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ToastAndroid} from 'react-native';
import autoBind from 'react-autobind';

import {Input} from './Input';
import {Button} from './Button';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  render() {
    return (
      <View style={styles.search}>
        <Input
          value={this.props.inputValue}
          onChangeText={this.props.onChangeText}
          inlineImageLeft="search_icon"
          placeholderTextColor="#fff"
          placeholder="search"
          label="Search"
          onEndEditing={this.onEndEditing}
          labelStyle={{color: '#fff'}}
        />
        <Button onPress={this.props.searchNews}>Search</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#616161'
  }
});

export default SearchPage;
