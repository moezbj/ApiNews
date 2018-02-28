import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

import {Input} from './Input';
import {Button} from './Button';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: 1};
    autoBind(this);
  }

  render() {
    return (
      <View style={styles.search}>
        <Input
          value={this.props.inputValue}
          onChangeText={this.props.onChangeText}
          inlineImageLeft="search_icon"
          placeholderTextColor="#BDBDBD"
          placeholder="type here"
          label="Search"
          onEndEditing={this.onEndEditing}
          labelStyle={{color: '#fff'}}
        />
        <Button onPress={() => this.props.searchNews(this.state.id)}>Search</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#616161',
    paddingTop: 10
  }
});

SearchPage.propTypes = {
  inputValue: PropTypes.string,
  onChangeText: PropTypes.func,
  searchNews: PropTypes.func,
  id: PropTypes.number
};

export default SearchPage;
