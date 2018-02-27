import React, {Component} from 'react';
import {WebView} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class WebPage extends Component {
  static navigationOptions = {
    title: 'The Guardian',
    headerStyle: {backgroundColor: '#253748'},
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 16,
      alignSelf: 'center',
      flex: 2
    }
  };
  render() {
    const {params} = this.props.navigation.state;
    const url = params ? params.url : null;
    return (
      <WebView
        source={{
          uri: url
        }}
      />
    );
  }
}
